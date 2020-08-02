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

export const setRecipeComments = (id, comments) => {
  return {
    type: 'SET_RECIPE_COMMENTS',
    id,
    comments
  }
}

export const startAddComment = (rating, comment, recipeId) => { 

  return (dispatch) => {
    fetch('/api/v1/comments', {
      method: 'POST',
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      
      body: JSON.stringify({
        rating, 
        comment, 
        recipeId
      })
    })
    .then((jsonData) => jsonData.json())
    .then((comment) => dispatch(addComment(comment.comment)) )
    .catch((e) => console.log(e.message))

  }
}

export const addComment = (comment)  => {
  return {
    type: 'ADD_COMMENT',
    comment
  }
}