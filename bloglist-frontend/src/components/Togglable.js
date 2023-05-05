import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisiblity = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => ({ toggleVisiblity }))

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisiblity} id='toggleButton'>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisiblity}>cancal</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
