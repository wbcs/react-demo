import { ReactiveEffect, track, trigger } from './effect'

export type Dep = Set<ReactiveEffect>
export type KeyToDepMap = Map<any, Dep>
export const targetMap = new WeakMap<any, KeyToDepMap>()

const rawToReactive = new WeakMap<any, any>()
const reactiveToRaw = new WeakMap<any, any>()

export const QUEUE = new WeakMap<any, any>()

const HANDLER = {
  get(target: object, key: string, receiver: any) {
    const res = Reflect.get(target, key, receiver)
    track(target, key)
    return res
  },
  set(target: object, key: string, value: any, receiver: any) {
    trigger(target, key)
    return Reflect.set(target, key, value, receiver)
  }
}

function createReactiveObject(target: object, baseHandler: any) {
  let observed = rawToReactive.get(target)
  if (observed !== undefined) {
    return observed
  }
  observed = new Proxy(target, baseHandler)
  rawToReactive.set(target, observed)
  reactiveToRaw.set(observed, target)
  if (!targetMap.get(target)) {
    targetMap.set(target, new Map())
  }
  return observed
}
export function reactive<T extends object>(target: T) {
  return createReactiveObject(target, HANDLER)
}
