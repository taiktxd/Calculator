import {
  Box,
  Flex,
  Card,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  CardBody,
} from '@chakra-ui/react';
import React from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'; 
import { APIShose } from './API/Constanst';
import  { useEffect } from 'react';


const Home = () => {
  const history = useHistory();
  const handleRedirect = () => {
    const isLoginLocal = JSON.parse(localStorage.getItem('userData'))
    if (isLoginLocal) {
      history.push('/pay');
    }else {
      history.push('/login');

    }
  };

  useEffect(() => {
    axios.get(APIShose)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Đã xảy ra lỗi:', error);
  });
  },[])

  return (
    <div>
      <Card maxW='sm'>
        <CardBody>
          <Image
            src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
            alt='Green double couch with wooden legs'
            borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>
            <Heading size='md'>Living room Sofa</Heading>
            <Text>
              This sofa is perfect for modern tropical spaces, baroque inspired
              spaces, earthy toned spaces and for people who love a chic design
              with a sprinkle of vintage design.
            </Text>
            <Text color='blue.600' fontSize='2xl'>
              $450
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='blue' onClick={handleRedirect}>
              Buy now
            </Button>
            <Button variant='ghost' colorScheme='blue'>
              Add to cart
            </Button>
            <Button variant='ghost' colorScheme='blue'>
              Detail
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Home;
