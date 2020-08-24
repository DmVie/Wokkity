import moment from 'moment';

/*
  @PARAM     LIST       THE ARRAY OF DATA TO BE ITERATED OVER
  @PARAM     FILTERS    THE FILTERS OBJECT AS SET BY THE USER 

*/
export const getSelectedData = (list, { cuisine='', text='',sortBy='date',startDate='', endDate=''} ) => {

  console.log('list ', list)
  console.log(cuisine)

  const selectedData = list.filter((item) => {
    const textMatch = item.title.toLowerCase().includes(text.toLowerCase())
    const cuisineMatch = cuisine === 'All' ? true : item.cuisine.toLowerCase().includes(cuisine.toLowerCase())
    const createdAtMoment = moment(item.createdAt);
    const startDateMatch = startDate ? startDate < createdAtMoment : true;
    const endDateMatch = endDate ? endDate > createdAtMoment : true

    

    return textMatch && cuisineMatch && startDateMatch && endDateMatch;
  }).sort((a, b) => {
    if(sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1; 
    }else if (sortBy === 'alphabetical') {
      return a.title < b.title ? -1 : 1; 
    }
  })
  console.log('Selected data ', selectedData)
  return selectedData // If not used it's default null,  means it has no effect...
}

/* @PARAM     OPTIONS    OPTIONS OBJECT - This is used for example by the home page that wants the last 8 recipes.  so it's used programmatically whereas FILTERS is user driven  */
// getLastXDaaata = (data, {limit=data.length, sortBy='date'}) => {

//   return data.slice(0, limit).sort((a, b) => {
//     if(sortBy === 'date') {
//       return a.createdAt < b.createdAt ? 1 : -1; 
//     }else if (sortBy === 'alphabetical') {
//       return a.title < b.title ? -1 : 1; 
//     }
  
// }


export const getLastXData = (dataList, {limit=dataList.length, sortBy='date'} ) => {
  return dataList.sort((a, b) => {
    if(sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1; 
    }else if (sortBy === 'alphabetical') {
      return a.title < b.title ? -1 : 1; 
    }
  })
  .slice(0, limit)
}

export const getCuisines = (recipes) => {
  // Dig out the cuisines value from object,  return all cuisine values as a new array
  const reduced = recipes.reduce((acc, item) => {
    return [...acc, item.cuisine]
  }, [])
  // then remove all duplicates so the list contains 1 instance of each cuisine.
  const filtered = reduced.filter((item, index) => reduced.indexOf(item) === index )  
  console.log('Selected Cuisines ', filtered)
  return filtered;
}
