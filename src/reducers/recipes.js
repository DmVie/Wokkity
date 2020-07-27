
export default (state=[], actions) => {
  switch( actions.type ) {

    case 'SET_RECIPES': 
      return [...actions.recipes]
    
    case 'SET_RECIPE_COMMENTS': 
      return state.map((recipe) => {
        if(recipe._id === actions.id) {
          return {
            ...recipe,
            comments: actions.comments
          }
        }else {
          return recipe;
        }
      })

    case 'ADD_COMMENT': 
      return state.map((recipe) => {
        if(recipe._id === actions.comment.recipe) {
          return {
            ...recipe,
            comments: [actions.comment, ...recipe.comments]
          }
        }else {
          return recipe;
        }
      })
    
    default: 
      return state;
  }


}