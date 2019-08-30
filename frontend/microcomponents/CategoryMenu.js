import React, { Component } from 'react';
import styled from 'styled-components';

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
    font-size: 3.5vh;
    color: #000;
    text-decoration: none;
    margin-bottom: 2rem;
    cursor: pointer;
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
  top: 4.5rem;
  right: 4rem;

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
    const { items } = this.props.categoriesMenu;

    return (
      <CategoryList>
        {menuIsOpen && (
          <CategoryContainer>
            <Close onClick={this.handleCloseMenu}>
              <div className="close" />
            </Close>
            <CategoryItem>
              {items.map(item => (
                <a href={item.url} alt="">
                  {item.title}
                </a>
              ))}
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
