import React from "react";
// @ts-ignore
import StarRatings from "react-star-ratings";

interface StarsRatingProps {
  rating: number;
  starsCount?: number;
  color?: string;
  size?: string;
}

export const StarsRating: React.VFC<StarsRatingProps> = ({
  rating,
  starsCount = 5,
  color = "#000000",
  size = "20px"
}) => {
  return (
    <StarRatings
      rating={rating}
      starRatedColor={color}
      starDimension={size}
      starSpacing="0.5px"
      numberOfStars={starsCount}
      name="rating"
      isSelectable={false}
    />
  );
};
