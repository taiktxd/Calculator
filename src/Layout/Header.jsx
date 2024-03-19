import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <Flex
        gap={10}
        p={2}
        bg={'#A60E1Aed'}
        color={'white'}
        alignItems={'center'}
      >
        <HamburgerIcon />
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
        <Link to='/contact'>Contact</Link>
      </Flex>
    </div>
  );
};

export default Header;
