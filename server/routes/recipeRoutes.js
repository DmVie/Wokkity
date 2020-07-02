const express = require('express');

const router = new express.Router();
const { getRecipes }  = require('../controllers/recipeController')


router.get('/', getRecipes)

module.exports = router;