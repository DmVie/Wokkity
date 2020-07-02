const Recipe = require('../models/Recipe')
const User = require('../models/User');


const getRecipes = async (req, res, next) => {
  try {
    const recipes  = await Recipe.find();
    res.status(200).send({
      success: true,
      msg: {
        txt: 'Fetched All Recipes'
      },
      payload: recipes
    })
  } catch (e) {
    res.status(500).send({
      success: false,
      msg: {
        txt: 'Unable to retrieve recipes',
        error: e.message
      }
    })
  }
}

module.exports = {
  getRecipes
}