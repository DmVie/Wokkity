import React from 'react'
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div>
      <h1>Page Not Found</h1>
      <p>Woops, looks like you're a little lost? <Link to="/">Go Home.</Link></p>
    </div>
  )
}

export default PageNotFound
