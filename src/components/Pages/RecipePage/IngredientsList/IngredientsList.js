import React from 'react'

const IngredientsList = (props) => {
  return (
    <ul>
    {
      props.ingredients.map((ingred) => {
        return <li key={ingred.name}>{ingred.name} | {ingred.amount}</li>
      })
    }
    </ul>
  )
}




export default IngredientsList
