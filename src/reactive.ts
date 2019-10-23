import { track, trigger } from './track'

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
    trigger(target, key, value)
    return Reflect.set(target, key, value, receiver)
  }
}

const createReactiveObject = (target: object, baseHandler: any) => {
  let observed = rawToReactive.get(target)
  if (observed !== undefined) {
    return observed
  }
  observed = new Proxy(target, baseHandler)
  rawToReactive.set(target, observed)
  reactiveToRaw.set(observed, target)
  return observed
}
function reactive<T extends object>(target: T) {
  return createReactiveObject(target, HANDLER)
}

export let target: Function
function effect(cb: Function) {
  target = cb
  cb()
}

export { reactive, effect }
