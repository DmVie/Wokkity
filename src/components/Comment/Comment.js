import React from 'react';

import './Comment.scss';

const Comment = () => {
  return (
    <section className="comment-container">
      <div className="comment-user-data">
        <div className="comment-avatar">
          image goes here.
        </div>
        <div className="comment-posted"> date goes here</div>
      </div>
      <div className="comment-data">
        <div className="comment rating">
          comment stars rating component here.
        </div>
        <div className="comment-text">
          Actual comment goes here.
        </div>
      </div>
    </section>
  )
}

export default Comment
