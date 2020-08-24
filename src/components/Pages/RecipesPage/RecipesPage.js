import React, { useState } from 'react';
import { connect } from 'react-redux';

import Banner from '../../Banner/Banner';
import ThumbList from '../../ThumbList/ThumbList';
import Filters from '../../../services/Filters/Filters';
import Button from '../../Button/Button';

import { getSelectedData, getCuisines } from '../../../services/Filters/selectors/getSelectedData';
// Action Generators
import { setText, setCuisine, setStartDate, setEndDate, setSortBy } from '../../../actions/filters';

import './RecipesPage.scss';



const RecipesPage = (props) => {

  const [ showFilters, setShowFilters ] = useState(false)

  const onSearchRecipeChange = (e) => {    
    props.onSearchRecipeChange(e.target.value)
  }


  return (
    <React.Fragment>
 
      <Banner 
        title="Recipes" 
        type="siteBanner" 
        img="https://wokkiti.s3-ap-southeast-1.amazonaws.com/20200701_173803+(3)+(1).jpg"
        {...props}
        />
      <div className="content-container recipes">
        <section className="page-content"> 
          <div className="filters-wrapper">
            {showFilters && 
              <Filters 
                filters={props.filters}
                cuisines={props.cuisines}
                setShowFilters={setShowFilters}
                onSearchRecipeChange={props.onSearchRecipeChange}
                onCuisineFilterChange={props.onCuisineFilterChange}
                onStartDateChange={props.onStartDateChange}
                onEndDateChange={props.onEndDateChange}
                onSortByChange={props.onSortByChange}
              />}
            <h2 className="thumb-list-title">{props.filters.cuisine} Recipes ({props.recipes.length})</h2>
            <p className="filter-text-p">Showing <strong>{props.filters.cuisine || 'all'}</strong> recipes sorted by <strong>{props.filters.sortBy}</strong>, posted in the last <strong>{props.filters.endDate.diff(props.filters.startDate, 'months')}</strong> months <Button onClick={() => setShowFilters(true)}>Change Filters</Button> </p>
            <input
              type="text" 
              className="recipe" 
              aria-label="recipe" 
              value={props.filters.text} 
              onChange={onSearchRecipeChange}
              placeholder="Search for a recipe"
              autoFocus
            />
          </div>
          <ThumbList recipes={props.recipes}/>
        </section>
      </div>    
    </React.Fragment>
  )
}

const mapDispatchToProps = (dispatch) => ({

  onSearchRecipeChange: (text) => {
    dispatch(setText(text))
  },
  onCuisineFilterChange: (cuisine) => {
    dispatch(setCuisine(cuisine))
  },
  onStartDateChange: (date) => {
    dispatch(setStartDate(date))
  },
  onEndDateChange: (date) => {
    dispatch(setEndDate(date))
  },
  onSortByChange: (sortBy) => {
    dispatch(setSortBy(sortBy))
  }
})

const mapStateToProps = (state) => {

  const cuisines = getCuisines(state.recipes);

 return {
  recipes: getSelectedData(state.recipes, state.filters),
  filters: state.filters,
  cuisines
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipesPage)
