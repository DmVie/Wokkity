import React from 'react'

import './Comments.scss';
import Button  from '../Button/Button';
import Comment from'../Comment/Comment';


const Comments = () => {


  return (
    <section className="comments-section">
      <Comment />
      <Button className="button button--blue">Comments (count)</Button>
    </section>
  )
}


export default Comments;