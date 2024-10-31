import React, { forwardRef } from 'react';
import user from '../../icons/user.png';
import { renderStars } from '../../Components/SimpleComponents/SimpleComponents';

const Review = forwardRef(({ reviews, productId }, ref) => {
  return (
    <div className="review-section" ref={ref}>
      <h2>Customer Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.date} className="review-item">
            <div className='reviewer'>
              <img className='iconImg' src={user} alt={`${review.reviewerName}'s profile`} />
              <p>
                <strong>{review.reviewerName}</strong> ({new Date(review.date).toLocaleDateString()})
              </p>
            </div>
            <div className='reviewDiv'>
              <p>{renderStars(review.rating)} {review.rating} stars</p>
              <p>{review.comment}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
      {/* Optionally, you could include a form to allow users to add new reviews */}
    </div>
  );
});

export default Review;
