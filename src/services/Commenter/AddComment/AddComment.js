import React, { useRef, useState } from 'react'
import clamp from 'lodash-es/clamp';
import { useSprings, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';

import CommentRating from '../AddComment/CommentRating/CommentRating';
import CommentForm from '../AddComment/CommentForm/CommentForm';
import './AddComment.scss';
import { connect } from 'react-redux';

import { startAddComment } from '../../../actions/recipes';



const AddComment = ({index = 0, setACM, recipeId, startAddComment}) => {

  const [ rating, setRating ] = useState(0); // individual rating

  const onSubmitComment = (comment) => {
    startAddComment(parseInt(rating), comment.trim(), recipeId);
  }

  const pages = [
    <CommentRating setACM={setACM} rating={rating} setRating={setRating}/>,
    <CommentForm setACM={setACM} onSubmitComment={onSubmitComment} />
  ]
  const internalIndex = useRef(index);
  const [ props, set ] = useSprings(pages.length, i => ({ x: i * window.innerWidth, sc: 1}))

  const bind = useGesture(({down, delta: [xDelta], direction: [xDir], distance, cancel}) => {
    if(down && distance > window.innerWidth / 2) {
      internalIndex.current = clamp(internalIndex.current + (xDir > 0 ? -1 : 1), 0, pages.length - 1);
      cancel() // cancel the gesture after dragging past half way point (half width of el)
    }

    set(i => {
      const x = (i - internalIndex.current) * window.innerWidth + (down ? xDelta : 0);
      const sc = down ? 1 - distance / window.innerWidth / 2 : 1
      return { x, sc }
    })
  })

  return (
    <div className="add-comment-container">
      {
        props.map(({ x, sc }, i) => (
          <animated.div {...bind()} key={i} className="add-comment-page" style={{transform: x.interpolate(x => `translate3d(${x}px, 0, 0)`)}}>
             <animated.div style={{transform: sc.interpolate(s => `scale(${s})`)}}>
               {pages[i]}
             </animated.div>
          </animated.div>
        ))
      }
    </div>

  )

}

const mapDispatchToProps = (dispatch) => {
  return {
    startAddComment: (rating, comment, recipeId) => dispatch(startAddComment(rating, comment, recipeId)) 
  }
}


export default connect(undefined, mapDispatchToProps)(AddComment)
