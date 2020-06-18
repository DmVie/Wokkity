

export const startSetRecipes = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      try {
        const recipes = JSON.parse(localStorage.getItem('recipes'))

        dispatch(setRecipes(recipes || []));  //catches localStorage returning null when no storage is set.
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