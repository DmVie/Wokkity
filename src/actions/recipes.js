

export const startSetRecipes = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      try {
        fetch('/api/v1/recipes')
        .then(response => response.json())
        .then(recipes => {
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
  return {
    type: 'SET_RECIPES',
    recipes
  }
  
}