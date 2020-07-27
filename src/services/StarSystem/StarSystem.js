import React  from 'react';

import './StarSystem.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// IndividualReviews are ratings that the user can set
// GroupAverage are read only ratings based off of aggregating the indiviudalReviews.
// The only difference between the two is groupAverage removes the onClick function that allows the user to set a rating. 


/*
  @PARAM  rating   float      Rating out of 5
  @PARAM  noOfRatings  int    If type is groupAverage then this number is output  
  @PARAM  setRating   Fn      Funtion passed down as props from addComment - this is used to set State in the add Comment component before the comment is sent to redux.
  @PARAM  type       String   'readRating' || 'addRating' where an addRatng allows the user to rate something by clicking on 1 - 5 of the stars,  and read is displaying review or average and is read only 
*/

const StarSystem = ({rating, noOfRatings, setRating, type='readRating'}) => {

  const starCount = [1,2,3,4,5];

  const wordReview = () => {
    return noOfRatings  === 1 ?  'rating' :  'ratings';   
  }

  return (
    <div className="star-system">
      <div className={ `star-container ${type === 'addRating' ?'star-container--add-rating' : ''}`}>
        <div className="stars">
          {
            starCount.map((star, i) => {
              return (
                <div key={i}
                  className={`star ${i < rating ? 'solid' : ''}`} 
                  onClick={type === 'addRating' ? () => setRating(i + 1) : () =>
                  false}
                >
                  <FontAwesomeIcon icon={i < rating ? ['fas', 'star'] : ['far', 'star']} />
                </div>
              )
            })   
          }
        </div>
        {type === 'groupAverage' && <p>({rating} / 5 from {noOfRatings} {wordReview()})</p>}
      </div>
    </div>

  )
}

export default StarSystem