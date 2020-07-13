
export default (state=[], actions) => {
  console.log(actions)
  switch( actions.type ) {

    case 'SET_RECIPES': 
      return [...actions.recipes]

    default: 
      return state;
  }
}