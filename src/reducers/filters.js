import moment from 'moment'

const defaultFilters = {
  cuisine: 'All',
  text: '',
  sortBy: 'date',
  startDate: moment().subtract('365', 'days'),
  endDate: moment()
}

const filtersReducer = (state=defaultFilters, action) => {
  switch(action.type) {

    case 'SET_TEXT': 
      return {
        ...state,
        text: action.text
      }
    case 'SET_CUISINE':
      return {
        ...state,
        cuisine: action.cuisine
      }
    case 'SET_START_DATE': 
    
      return {
        ...state,
        startDate: action.startDate
      }

    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      }
    case 'SET_SORTBY': 
    return {
      ...state,
      sortBy: action.sortBy
    }
    default:
      return state;
  }
}

export default filtersReducer;