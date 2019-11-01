// import render from './app'
// render()
// import { reactive, effect } from './reactivity/dist/reactivity.cjs'
import { reactive, effect } from './vue'

const obj = reactive({
  age: 0,
  name: 'Bruce'
})

effect(() => {
  console.log(obj.age)
})

setInterval(() => {
  obj.age = obj.age + 1
}, 2000)
