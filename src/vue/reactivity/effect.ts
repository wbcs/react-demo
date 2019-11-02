import { targetMap, Dep } from './reactive'

export interface ReactiveEffect<T = any> {
  (): T
  _isEffect: true
  active: boolean
  raw: () => T
  deps: Array<Dep>
  options: ReactiveEffectOptions
}
export interface ReactiveEffectOptions {
  lazy?: boolean
  computed?: boolean
  scheduler?: (run: Function) => void
  onTrack?: (event: any) => void
  onTrigger?: (event: any) => void
  onStop?: () => void
}

export const effectStack: ReactiveEffect[] = []

export function isEffect(fn: any): fn is ReactiveEffect {
  return fn !== null && fn._isEffect === true
}

export function effect<T = any>(
  fn: () => T,
  options: ReactiveEffectOptions = {}
) {
  if (isEffect(fn)) {
    fn = fn.raw
  }
  const effect = createReactiveEffect(fn, options)
  if (!options.lazy) {
    effect()
  }
  return effect
}

function createReactiveEffect<T = any>(
  fn: () => T,
  options: ReactiveEffectOptions = {}
): ReactiveEffect<T> {
  const effect = function reactiveEffect(...args: unknown[]): unknown {
    return run(effect, fn, args)
  } as ReactiveEffect
  effect._isEffect = true
  effect.active = true
  effect.raw = fn
  effect.deps = []
  effect.options = options
  return effect
}

function run(
  effect: ReactiveEffect,
  fn: Function,
  args: unknown[]
): unknown {
  if (!effect.active) {
    return fn(...args)
  }
  if (effectStack.includes(effect)) {
    return
  }
  // 这是一次新的，把effect的依赖清除
  cleanup(effect)
  try {
    effectStack.push(effect)
    return fn(...args)
  } finally {
    effectStack.pop()
  }
}

function cleanup(effect: ReactiveEffect) {
  const { deps } = effect
  deps.forEach(depSet => depSet.delete(effect))
  deps.length = 0
}

// effect执行时，会触发get，get中会调用track
export function track(target: object, key: string) {
  if (effectStack.length === 0 || !shouldTrack) return
  const effect = effectStack[effectStack.length - 1]
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, depsMap = new Map())
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, dep = new Set())
  }
  if (!dep.has(effect)) {
    dep.add(effect)
    // 之所以要有这一行，是在清除依赖的时候使用
    effect.deps.push(dep)
  }
}

export function trigger(target: object, key: string) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const effects: Set<ReactiveEffect> = new Set()
  addRunners(effects, depsMap.get(key))
  const run = (effect: ReactiveEffect) => {
    scheduleRun(effect)
  }
  // 等同[...depsMap.get(key)].forEach
  // 在执行effect之前会清除掉effect.deps中每个set，set的内容就是effect
  // 执行effect再次触发track，从而给set重新添加
  // 也就是targetMap中 target <-> Map(key, set(effect))
  // 期中的set(effect)重新绑定，就会造成死循环
  effects.forEach(run)
}

function addRunners(
  effects: Set<ReactiveEffect>,
  effectsToAdd?: Set<ReactiveEffect>
) {
  if (!effectsToAdd) {
    return
  }
  effectsToAdd.forEach(effect => effects.add(effect))
}

function scheduleRun(effect: ReactiveEffect) {
  effect()
}

let shouldTrack: boolean = true

export function pauseTracking() {
  shouldTrack = false
}

export function resumeTracking() {
  shouldTrack = true
}
