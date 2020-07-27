import React from 'react';
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Comment.scss';
import StarSystem from '../../StarSystem/StarSystem';

import decodeHTML from '../../../utils/decodeHTML';

const Comment = (props) => {
  return (
    <section className="comment-container">
      <div className="comment-user-data">
        <div className="user-data-left">
          <div className="comment-avatar">
            <img src={props.owner.avatar} alt={props.owner.username}/>
          </div>
          <p>{props.owner.username}</p>
        </div>
        <div className="user-data-right">
          <div className="comment-posted"> Reviewed: {moment(props.posted).format('DD MMMM, YYYY')}
          </div>  
          
           <StarSystem rating={props.rating} />
        </div>
      </div>
      <div className="comment-data">
        <div className="comment-text">
          {
            props.text !== "" && <p><FontAwesomeIcon icon={['fas','quote-left']}/> {decodeHTML(props.text)}<FontAwesomeIcon icon={['fas', 'quote-right']}/></p>
          }
      </div>
      </div>
    </section>
  )
}

export default Comment
