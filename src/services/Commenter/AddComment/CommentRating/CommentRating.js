import React from 'react';
import StarSystem from '../../../StarSystem/StarSystem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CommentRating = ({setACM, rating, setRating}) => {

  return (
    <div className="comment-rating-container">
      <div className="page-number">Page 1 of 2</div>
      <p className="close-add-comment"><FontAwesomeIcon icon='window-close' onClick={() => setACM(false)}/></p>
      <h1>Rate this Recipe!</h1>
 
      <div>
        <label htmlFor="vol">Rating (Between 0 and 5):</label>
      </div>
      <StarSystem rating={rating} setRating={setRating} type="addRating"/>
      <div>
        <p className="swipe-instructions"> ( Swipe left to continue )</p>
      </div> 
    </div>
  )
}

export default CommentRating
