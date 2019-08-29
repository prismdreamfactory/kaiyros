import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import { HeaderContent } from '../microcomponents/HeaderContent';
import CategoryMenu from '../microcomponents/CategoryMenu';

const LayoutStyle = styled.div`
  font-family: futura;
`;

const Layout = props => {
  const { children } = props;
  return (
    <LayoutStyle>
      <Header />
      <HeaderContent />
      <CategoryMenu />
      {children}
      <Footer />
    </LayoutStyle>
  );
};
export default Layout;
