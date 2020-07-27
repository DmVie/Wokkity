import React, { useState } from 'react'

import './Comments.scss';
import AddComment from '../AddComment/AddComment';
import Button  from '../../../components/Button/Button';
import Comment from'../Comment/Comment';
import Modal from '../../Modal/Modal';
import { connect } from 'react-redux';

const Comments = ({id, comments, signedIn}) => {


  const [ activateCommentModal, setACM ] = useState(false);

  const canIComment 
  = () => signedIn && setACM(true)

  return (
    <section className="comments-section">
      {
        signedIn ? (
          <Button className="button button--blue add-comment-btn" onClick={canIComment}>Add A Comment / Rating</Button>
        ) : (
          <Button className="button--btn-disabled add-comment-btn" title={'Sign in to comment'}>Sign in to add a comment / rating</Button>
        )
      }
      {
        comments && comments.length > 0 && comments.map((comment, index) => {
          return ( 
            <Comment key={index} {...comment} />
          )
        })
      }
      {
        activateCommentModal &&  (
          <Modal>
            <AddComment setACM={setACM} recipeId={id} />
          </Modal>
        )
      }
    </section>
  )
}

const mapStateToProps = (state) => ({
  signedIn: !!state.user.uid
})

export default connect(mapStateToProps)(Comments);