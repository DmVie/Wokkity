

const getAverageRating = (comments) => {
  console.log('coments ', comments)
  const totalRating =  comments.reduce((acc, {rating}) => {
    return acc + rating;
  }, 0)

  const noOfReviews = (comments.filter((comment) => comment.rating !== 0)).length;
  console.log(totalRating, 'totalRatings');
  console.log('how many reviews? ', noOfReviews)

  return Number((totalRating / noOfReviews).toFixed(2))
}

export default getAverageRating;