

export const startSetRecipes = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      try {
        fetch('/api/v1/recipes')
        .then(response => response.json())
        .then(recipes => {
           console.log('Recipes coming back from startSetRecipes action? ', recipes)
           return dispatch(setRecipes(recipes.payload || []))
        });
        resolve();
      } catch (e) {
        reject(e.message);
      }
    })  
  }
}

const setRecipes = (recipes) => {
  console.log('setRecipes action recipe list ', recipes)
  return {
    type: 'SET_RECIPES',
    recipes
  }
  
}