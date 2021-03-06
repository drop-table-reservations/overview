import React from 'react';
import PropTypes from 'prop-types';
import { StyledHeader, Fa, FaStar } from './styles';

const Header = (props) => {
  const fillStars = () => {
    const { reviewAvg } = props.headerData;
    const stars = [];
    for (let i = 0; i < reviewAvg; i += 1) {
      stars.push(<FaStar key={i} className="fa fa-star" />);
    }

    while (stars.length < 5) {
      stars.push(<FaStar key={stars.length} className="fa fa-star-o" />);
    }
    return stars;
  };

  const { headerData } = props;
  return (
    <StyledHeader>
      <span>
        {fillStars()}
        {` ${headerData.reviewAvg}.0`}
      </span>
      <span>
        <Fa className="fa fa-comment-o" />
        {` ${headerData.reviews} reviews`}
      </span>
      <span>
        <Fa className="fa fa-money" />
        {` ${headerData.price}`}
      </span>
      <span>
        <Fa className="fa fa-cutlery" />
        {` ${headerData.cuisines}`}
      </span>
    </StyledHeader>
  );
};

Header.propTypes = {
  headerData: PropTypes.instanceOf(Object).isRequired,
};

export default Header;
