export const setText = (text) => {
  return {
    type: 'SET_TEXT',
    text
  }
}

export const setCuisine = (cuisine) => {
  return {
    type: 'SET_CUISINE',
    cuisine
  }
}


export const setStartDate = (startDate) => {
  return {
    type: 'SET_START_DATE',
    startDate
  }
}

export const setEndDate = (endDate) => {
  return {
    type: 'SET_END_DATE',
    endDate
  }
}

export const setSortBy = (sortBy) => {
  console.log('waht is the sort by ', sortBy)
  return {
    type: 'SET_SORTBY',
    sortBy
  }
}