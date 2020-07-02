import React from 'react'

const PreparationList = (props) => {
  return (
    <ol>
    {
      props.preparation.map((item, index) => <li key={index}>{item}</li>)
    }
  </ol>
  )
}



export default PreparationList
