import React from 'react'

import './Button.css';

const Button = (props) => { 
  const {
    text,
    ...rest
  } = props

  return (
    <button className="button button--btn-transparent--red-sides" {...rest}>{text}</button>
  )
}

export default Button
