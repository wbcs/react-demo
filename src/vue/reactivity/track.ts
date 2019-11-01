import { target as Target } from './reactive'

const callbackQueue = new WeakMap<object, Map<string, Function>>()

const track = (target: object, key: string) => {
  const map = new Map<string, Function>()
  map.set(key, Target)
  callbackQueue.set(target, map)
}

const trigger = (target: object, key: string, value: any) => {
  const map = callbackQueue.get(target)
  if (!map) return
  const cb = map.get(key)
  if (typeof cb !== 'function') return
  cb()
}

export { track, trigger }
