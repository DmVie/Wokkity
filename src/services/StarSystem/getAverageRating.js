

const getAverageRating = (comments) => {
  const totalRating =  comments.reduce((acc, {rating}) => {
    return acc + rating;
  }, 0)

  const noOfReviews = (comments.filter((comment) => comment.rating !== 0)).length;

  return Number((totalRating / noOfReviews).toFixed(2))}

export default getAverageRating;