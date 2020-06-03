import React, { useState, useEffect, useLayoutEffect } from 'react'
import * as ReactDOM from 'react-dom'

const useForceUpdate = () => {
  const [_, forceUpdate] = useState(Symbol())
  return () => forceUpdate(Symbol())
}

const App = () => {
  const forceUpdate = useForceUpdate()
  const handleClick = () => {
    forceUpdate()
  }
  console.log('update')
  return <div onClick={handleClick}>1234</div>
}

export default () => {
  ReactDOM.render(<App />, document.querySelector('#root'))
}
