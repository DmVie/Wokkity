const express = require('express');

const Recipe = require('../models/Recipe');
const Comment = require('../models/Comment');
const { body, validationResult } = require('express-validator');
const router = new express.Router();
const authGuard = require('../middleware/authGuard');

// @PARAM:  id    string     mongdb ObjectID of recipe comment should be associated to
router.post('/', [
  body('rating')
  .isInt({min: 0, max: 5}),
  body('recipeId')
    .isMongoId(),
  body('comment')
    .trim()
    // .not().isEmpty() commented out as want to make comment optional, eg instances where they only want to rate the recipe not necessarily comment on it.
    .escape()
], authGuard, async (req, res) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const comment = new Comment({
      owner: req.user._id,
      recipe: req.body.recipeId,
      rating: req.body.rating,
      text: req.body.comment
    })
  
    await comment.save()
    await comment.populate({
      path: 'owner'
    }).execPopulate()

    res.status(201).send({
      status: true,
      msg: 'Comment added succesfully',
      comment
    })
  } catch (e) {
    return res.status(500).send(e.message)
  }
})

// @query String
// GET /comments?limit=10&skip=10
router.get('/:id', async (req, res) => {

   const sort = { posted: -1 }  // for now returned comments will always be sorted by date desc, might introduce other sorting features later...


  try {
    // Find the recipe whose comments are to be sent: 
    const recipe = await Recipe.findById(req.params.id);
    if(!recipe) return res.status(404).send({msg: 'Unable to find recipe with that id...'});

    await recipe
      .populate({
        path: 'comments',
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort
        },
        populate: {
          path: 'owner'
        }
    }).execPopulate()
      res.status(200).send(recipe.comments)
    } catch (e) {
    res.status(500).send()

  }
})

module.exports = router;