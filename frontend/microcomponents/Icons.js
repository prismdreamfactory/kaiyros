import React from 'react';
import styled from 'styled-components';
import { FaInstagram, FaTwitter, FaPinterest } from 'react-icons/fa';

const IconsStyle = styled.div`
  svg {
    color: #000;
    margin-right: 1rem;
  }
  svg:hover {
    color: #2b9985;
  }
`;

export const Icons = () => {
  return (
    <IconsStyle>
      <a
        href="https://www.instagram.com/kaiyros_27/?hl=en"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram size="30px" />
      </a>
      <a
        href="https://twitter.com/kaiyros_27"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaTwitter size="30px" />
      </a>
      <a
        href="https://www.pinterest.com/kaiyros_27/?eq=kaiyros&etslf=4567"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaPinterest size="30px" />
      </a>
    </IconsStyle>
  );
};

export default Icons;
