import React, { useState, useEffect, useRef } from 'react'
import { dpMsgCenter } from '@dp/msg-center'
import * as ReactDOM from 'react-dom'

const App = () => {
  const ref = useRef()
  useEffect(() => {
    // dpMsgCenter({
    //   secret: 'rkm5LfgLUbRoTH_UmgF9h',
    //   dom: ref.current!,
    //   websocket: true
    // });

    const script = document.createElement('script')
    script.src =
      'http://s3.pstatp.com/dp/msgcenter/public/msgcenter_sdk_3.0.1.js'
    document.body.appendChild(script)

    window.__dpMsgCenterOpts = {
      secret: 'rkm5LfgLUbRoTH_UmgF9h',
      dom: ref.current!,
      websocket: true
    }
  }, [])
  return (
    <div>
      <div ref={ref} />
    </div>
  )
}

export default () => {
  ReactDOM.render(<App />, document.querySelector('#root'))
}
