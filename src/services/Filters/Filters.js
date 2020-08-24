import React, { useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { DateRangePicker } from 'react-dates';


import './Filters.scss';

const Filters = (props) => {
   // Date picker state:
  const [ focusedInput, setFocusedInput ] = useState(null)
  console.log('these fritzers ', props.filters)

  // Transitions State
  const [show, set] = useState(false)
  const transitions = useTransition(show, null, {
  from: {opacity: 0, transform: 'translate3d(-100%,0,0)'},
  enter: {opacity: 1, transform: 'translate3d(0%,0,0)'},
  leave: { opacity: 0, transform: 'translate3d(-100%,0,0)' },
  })

  useEffect(() => {
    set(true)
    console.log('This is the filters ',  props.filters)
  },[])

  const onDatesChange = ({startDate, endDate}) => {
    props.onStartDateChange(startDate)
    props.onEndDateChange(endDate)
  }


  const onCloseFilters = () => {
    set(false);
    setTimeout(() => {
      props.setShowFilters(false)
    }, 300)
  }

 const getCuisineList = () => {
    return props.cuisines.map((cuisine) => {
      return <option value={cuisine}>{cuisine}</option>
    })
  }

  return transitions.map(({ item, key, props: styleProps }) =>
  item &&
    <animated.div key={key} style={styleProps} className="filters-container">
        <FontAwesomeIcon icon={['far', 'window-close']} onClick={onCloseFilters}/>
        <h3>Filters</h3>
        <div>
          Find
          <input
            type="text" 
            className="recipe" 
            aria-label="recipe" 
            value={props.filters.text} 
            onChange={e => props.onSearchRecipeChange(e.target.value)}
            placeholder="All"
          />
          recipes
        </div>
        <div>Select  
        <select 
            value={props.filters.cuisine}
            onChange={(e) => props.onCuisineFilterChange(e.target.value)}>
            <option value="All">All</option>
            {getCuisineList()}
        </select>
        cuisine
        </div> 
 
        <div>Posted between</div>
        <DateRangePicker
          startDate={props.filters.startDate} // momentPropTypes.momentObj or null,
          startDateId="filterStartDate" // PropTypes.string.isRequired,
          endDate={props.filters.endDate} // momentPropTypes.momentObj or null,
          endDateId="filterEndDate" // PropTypes.string.isRequired,
          onDatesChange={onDatesChange}
          focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        <div>
          Display in
          <select 
            value={props.filters.sortBy}
            onChange={(e) => props.onSortByChange(e.target.value)}>
            <option value="date">Date</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
          order
        </div>
      </animated.div>
  )
}

export default Filters
