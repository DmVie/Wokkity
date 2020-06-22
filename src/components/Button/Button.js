import React from 'react'

import './Button.scss';

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
