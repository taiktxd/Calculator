import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <div>Footer</div>
    </div>
  );
};

export default Layout;
