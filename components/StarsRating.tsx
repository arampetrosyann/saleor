import React from "react";
// @ts-ignore
import StarRatings from "react-star-ratings";

interface StarsRatingProps {
  rating: number;
  starsCount?: number;
  color?:string;
}

export const StarsRating:React.VFC<StarsRatingProps> = ({ rating, starsCount=5 , color = "#000000"}) => {
  return (
    <StarRatings
      rating={rating}
      starRatedColor={color}
      starDimension="14px"
      starSpacing="3px"
      numberOfStars={starsCount}
      name="rating"
      isSelectable={false}
    />
  );
};
