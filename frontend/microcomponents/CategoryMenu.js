import React, { Component } from 'react';
import styled from 'styled-components';
import { Icons } from './Icons';

const CategoryList = styled.div``;

const CategoryContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 11;
  background: #ccc;
`;

const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  a {
    text-decoration: none;
    cursor: pointer;
    color: #000;
    padding: 1rem;
  }
  img {
    width: 10%;
    padding: 0 1rem;
  }
  .categoryEntry {
    display: flex;
    margin-bottom: 0.5rem;
  }

  .icons {
    display: none;
    @media (min-width: 0px) and (max-width: 1024px) {
      display: flex;
      justify-content: center;
    }
  }
`;

const Open = styled.a`
  /* position: fixed;
  top: 2rem;
  right: 2rem; */
  cursor: pointer;

  div {
    width: 35px;
    height: 3px;
    background-color: black;
    margin: 6px 0;
  }
`;

const Close = styled.a`
  position: fixed;
  top: 2rem;
  right: 2rem;

  .close {
    width: 40px;
    height: 40px;
    position: relative;
    cursor: pointer;
  }

  .close:before {
    content: '';
    height: 40px;
    border-left: 2px solid #000;
    position: absolute;
    transform: rotate(-45deg);
    left: 28px;
  }
  .close:after {
    content: '';
    height: 40px;
    border-left: 2px solid #000;
    position: absolute;
    transform: rotate(45deg);
    left: 28px;
  }
`;

class CategoryMenu extends Component {
  state = {
    menuIsOpen: false,
  };

  handleOpenMenu = () => {
    this.setState(prevState => ({
      menuIsOpen: !prevState.menuIsOpen,
    }));
  };

  handleCloseMenu = () => {
    this.setState(prevState => ({
      menuIsOpen: !prevState.menuIsOpen,
    }));
  };

  render() {
    const { menuIsOpen } = this.state;
    const { categoriesMenu } = this.props;

    return (
      <CategoryList>
        {menuIsOpen && (
          <CategoryContainer>
            <Close onClick={this.handleCloseMenu}>
              <div className="close" />
            </Close>
            <CategoryItem>
              {categoriesMenu.map(category => (
                <div className="categoryEntry">
                  <img
                    src={category.acf.image.sizes.thumbnail}
                    alt="placeholder"
                  />
                  <a href={category.link} alt="">
                    {category.name}
                  </a>
                </div>
              ))}
              <div className="icons">
                <Icons />
              </div>
            </CategoryItem>
          </CategoryContainer>
        )}
        {!menuIsOpen && (
          <Open onClick={this.handleOpenMenu}>
            <div />
            <div />
            <div />
          </Open>
        )}
      </CategoryList>
    );
  }
}

export default CategoryMenu;
