import React from 'react';
import './ThumbListItem.scss';

import Banner from '../Banner/Banner';

const ThumbListItem = ({recipe}) => {
  return (
    <li>
      <Banner type="thumb" {...recipe}/>
    </li>
  )
}

export default ThumbListItem
