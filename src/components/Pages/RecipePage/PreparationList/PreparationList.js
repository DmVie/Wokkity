import React from 'react'

const PreparationList = (props) => {
  return (
    <ol>
    {
      props.preparation.map((item) => <li>{item}</li>)
    }
  </ol>
  )
}



export default PreparationList
