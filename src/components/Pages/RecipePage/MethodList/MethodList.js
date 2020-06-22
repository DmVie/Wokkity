import React from 'react'

const MethodList = (props) => {
  return (
    <ol>
      {
        props.method.map((item) => <li>{item}</li>)
      }
    </ol>
  )
}

export default MethodList
