import React from 'react'

const MethodList = (props) => {
  return (
    <ol>
      {
        props.method.map((item, index) => <li key={index}>{item}</li>)
      }
    </ol>
  )
}

export default MethodList
