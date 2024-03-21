import { Box, Button, Center, Flex, Input, Text } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const onSubmit = (data) => {
    if (data) {
      history.push('/');
    }
  };

  return (
    <Center mt={20}>
      <Box
        border='1px'
        borderColor='gray.200'
        style={{ padding: '10px' }}
        className='text-center'
      >
        <Center>Login</Center>

        <form onSubmit={handleSubmit(onSubmit)} className='p-3'>
          <label htmlFor=''>Tài khoản</label>
          <Input placeholder='Nhập tài khoản' {...register('userName')} />

          <label htmlFor=''>Mật khẩu</label>
          <Input placeholder='Nhập mật khẩu' {...register('password')} />
          <Center style={{ marginTop: '10px' }}>
            <Button type='submit'>Đăng nhập</Button>
          </Center>
        </form>
      </Box>
    </Center>
  );
};

export default Login;
