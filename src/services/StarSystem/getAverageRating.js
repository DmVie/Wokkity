

const getAverageRating = (comments) => {
  
  const totalRating =  comments.reduce((acc, {rating}) => {
    return acc + rating;
  }, 0)

  const noOfReviews = (comments.filter((comment) => comment.rating !== 0)).length;
  console.log(totalRating, 'totalRatings');
  console.log('how many reviews? ', noOfReviews)
}

export default getAverageRating;