import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import { HeaderContent } from '../microcomponents/HeaderContent';

const LayoutStyle = styled.div`
  font-family: futura;
  margin: 20px;
  padding: 20px;
`;

const Layout = props => {
  const { children } = props;
  return (
    <LayoutStyle>
      <Header />
      <HeaderContent />
      {children}
      <Footer />
    </LayoutStyle>
  );
};
export default Layout;
