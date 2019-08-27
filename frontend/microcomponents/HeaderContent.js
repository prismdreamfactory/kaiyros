import React from 'react';
import styled from 'styled-components';
import { FaInstagram, FaTwitter, FaPinterest } from 'react-icons/fa';

const HeaderStuff = styled.div`
  display: flex;
  justify-content: space-between;

  a {
    text-decoration: none;
  }
  h1 {
    text-transform: uppercase;
    margin-bottom: 0.3rem;
  }
  h4 {
    text-transform: uppercase;
    margin-left: 11rem;
  }
  .head {
    width: 40%;
  }
  .title {
    display: flex;
    border-bottom: 2px solid #000;
    align-items: flex-end;
  }
  .logo {
    width: 4rem;
    border: 1px solid #000;
    margin: 0.7rem;
    padding: 0.3rem;
  }
  .icons {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 15%;
  }
`;

export const HeaderContent = () => {
  return (
    <HeaderStuff>
      <div className="head">
        <a href="/">
          <div className="title">
            <img
              className="logo"
              src="../static/images/KairosLogoSquare.svg"
              alt=""
            />
            <h1>Kaiyros.net</h1>
          </div>
        </a>
        <h4>Connecting the :Dots: of Human Potential</h4>
      </div>
      <div className="icons">
        <a
          href="https://www.instagram.com/kaiyros_27/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram size="40px" />
        </a>
        <a
          href="https://twitter.com/kaiyros_27"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter size="40px" />
        </a>
        <a
          href="https://www.pinterest.com/kaiyros_27/?eq=kaiyros&etslf=4567"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaPinterest size="40px" />
        </a>
      </div>
    </HeaderStuff>
  );
};

export default HeaderContent;
