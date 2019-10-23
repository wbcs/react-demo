// import render from './app'
// render()
// import { reactive, effect } from './reactivity/dist/reactivity.cjs'
import { reactive, effect } from './reactive'

const obj = reactive({
  age: 0,
  name: 'Bruce'
})

effect(() => {
  console.log(obj.age)
})

setInterval(() => {
  obj.age++
}, 2000)
