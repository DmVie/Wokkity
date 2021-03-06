import React from 'react'

import './Button.scss';

const Button = (props) => { 
  const {
    children,
    ...rest
  } = props

  return (
    <button {...rest}>{children}</button>
  )
}

export default Button
