import React, { useState } from 'react';

import Button from '../../../../components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CommentForm.scss';


const CommentForm = ({setACM, onSubmitComment}) => {

  const [ comment, setComment ] = useState('')

  const onSubmit = (e) => {
    e.preventDefault();
    onSubmitComment(comment.trim());
    setACM(false)
  }


  return (
    <div className="comment-form-container">
      <div className="page-number">Page 2 of 2</div>
      <p className="close-add-comment"><FontAwesomeIcon icon='window-close' onClick={() => setACM(false)}/></p>
      <h1>Leave a Comment!</h1>
      <form onSubmit={onSubmit} className="comment-form">
        <label htmlFor="comment"></label>
        <textarea 
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <div>
          <Button
            className="button button--blue"
          >Post
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CommentForm 