import React from 'react';
import './SwitchBox.scss';

const SwitchBox = ({switchBoxLinks, switchBoxRoutes}) => {

  return (
    <section className="switch-box-container">
      <div className="switch-box-header">
        {switchBoxLinks}
      </div>
      <section className="switch-box-content">
        {switchBoxRoutes}
      </section>
    </section>
  )
}

export default SwitchBox
