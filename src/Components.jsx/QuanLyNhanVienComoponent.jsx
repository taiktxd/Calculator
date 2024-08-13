import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Select,
  Image,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';


const QuanLyNhanVienComoponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [employee, setEmployee] = useState({
    email: '',
    name: '',
    avatar: '',
    position: '',
    wage: 0,
    ratings: '',
  });
  const [listEmployee, setListEmployee] = useState(() => {
    const saveEmployee = localStorage.getItem('listEmployee')
      return saveEmployee ? JSON.parse(saveEmployee) : []
  });
  const [errors, setErrors] = useState({});
  

  const handleInputChange = (event, key) => {
    
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [key]: event.target.value,
    }));
  };


  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (!employee.email.match(/\S+@\S+\.\S+/)) {
      tempErrors.email = 'Email không đúng định dạng.';
      isValid = false;
    }

    if (!employee.name) {
      tempErrors.name = 'Tên không được bỏ trống.';
      isValid = false;
    }

    if (!employee.position) {
      tempErrors.position = 'Vị trí không được bỏ trống.';
      isValid = false;
    }

    if (!employee.wage || employee.wage <= 0) {
      tempErrors.wage = 'Lương phải lớn hơn 0.';
      isValid = false;
    }

    if (!employee.ratings) {
      tempErrors.ratings = 'Đánh giá không được bỏ trống.';
      isValid = false;
    }

    if (!employee.avatar) {
      tempErrors.avatar = 'Chưa thêm hình ảnh'
    }

    setErrors(tempErrors);
    return isValid;
  };

  const removeDiacritics = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}


  const handleChangeAdd = () => {
    if (handleValidation()) {
      
      const newEmail = employee.email

      const checkEmail = removeDiacritics(newEmail.toLowerCase().replace(/\s+/g, ""));
      const checkList = listEmployee.filter(item => {
        const newEmailList = item.email
        const newItem = removeDiacritics(newEmailList.toLowerCase().replace(/\s+/g, ""));
        return newItem === checkEmail
      })

      

      if(checkList.length === 0 && newEmail.trim() !== '') {
        const newList = [...listEmployee, employee];
        setListEmployee(newList);
        localStorage.setItem('listEmployee', JSON.stringify(newList));
        
        
        onClose();
        setErrors({});
      } else {
        alert('Email này đã được đăng kí');
        onClose();
      }
      
    }
  };

  

  useEffect(() => {
    localStorage.setItem('listEmployee', JSON.stringify(listEmployee))
  }, [listEmployee])

  useEffect(() => {
    if (onClose) {
      setErrors({});
      
    } 
  }, [isOpen, employee]);

  

  const handleEdit = (index) => {
    const employeeEdit = listEmployee[index]
    setEmployee(employeeEdit)
    onOpen()
    console.log(employeeEdit)
    
  };

  const handleDelete = (index) => {
    listEmployee.splice(index, 1);
    setListEmployee([...listEmployee]);
  }

 
  

  return (
    <Box >
      <Flex color={'#43184F'} p={5} bgColor={'#8FB19E'} justifyContent={'space-around'} alignItems={'center'}>
        <Text fontWeight={{base: 400, lg: 600, xl: 700}} fontSize={{base: 20, lg: 22, xl: 24}} _hover={{cursor: 'pointer'}}>
          Thông Tin Nhân Viên
        </Text>
        <Button color={'#8FB19E'} p={5} bgColor={'#43184F'} onClick={onOpen}>Mở Thông Tin</Button>
      </Flex>
      <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thông Tin Nhân Viên</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type='email'
                borderColor={errors.email ? 'red' : 'gray'}
                onChange={(event) => handleInputChange(event, 'email')}
                value={employee.email}
                
              />
              {errors.email && (
                <FormHelperText color={'red'}>{errors.email}</FormHelperText>
              )}
            </FormControl>

            <FormControl isInvalid={errors.name}>
              <FormLabel>Tên</FormLabel>
              <Input
                type='text'
                onChange={(event) => handleInputChange(event, 'name')}
                value={employee.name}
              />
              {errors.name && (
                <FormHelperText color={'red'}>{errors.name}</FormHelperText>
              )}
            </FormControl>

            <FormControl isInvalid={errors.avatar}>
              <FormLabel>Hình Ảnh</FormLabel>
              <Input
                type='text'
                onChange={(event) => handleInputChange(event, 'avatar')}
                value={employee.avatar}

              />
              {errors.avatar && (
                <FormHelperText color={'red'}>{errors.avatar}</FormHelperText>
              )}
            </FormControl>

            <FormControl isInvalid={errors.position}>
              <FormLabel>Vị Trí</FormLabel>
              <Select
                placeholder='Vị trí'
                onChange={(event) => handleInputChange(event, 'position')}
                value={employee.position}

              >
                <option value='Employee'>Nhân viên</option>
                <option value='Manager'>Quản lý</option>
                <option value='Director'>Giám đốc</option>
              </Select>
              {errors.position && (
                <FormHelperText color={'red'}>{errors.position}</FormHelperText>
              )}
            </FormControl>

            <FormControl isInvalid={errors.wage}>
              <FormLabel>Lương</FormLabel>
              <Input
                type='number'
                onChange={(event) => handleInputChange(event, 'wage')}
                value={employee.wage}

              />
              {errors.wage && (
                <FormHelperText color={'red'}>{errors.wage}</FormHelperText>
              )}
            </FormControl>

            <FormControl isInvalid={errors.ratings}>
              <FormLabel>Đánh Giá</FormLabel>
              <Select
                placeholder='Đánh giá'
                onChange={(event) => handleInputChange(event, 'ratings')}
                value={employee.ratings}

              >
                <option value='Good'>Tốt</option>
                <option value='Fair'>Khá</option>
                <option value='Average'>Trung bình</option>
              </Select>
              {errors.ratings && (
                <FormHelperText color={'red'}>{errors.ratings}</FormHelperText>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              Đóng
            </Button>
            <Button variant='ghost' bgColor='blue.600' onClick={handleChangeAdd}>
              Thêm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
     

      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>STT</Th>
              <Th>Avatar</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th isNumeric>Position</Th>
              <Th isNumeric>Ratings</Th>
              <Th isNumeric>Wage</Th>

            </Tr>
          </Thead>
          <Tbody fontWeight={600}>
            {listEmployee.map((item, index) => {
              return (
                <Tr  key={index} >
                    <Td>{index + 1}</Td>
                    <Image src={item.avatar} m={'5px'} w={100} h={100} borderRadius={'50%'} border={'1px solid gray'} alt={item.name}/>
                    <Td>{item.name}</Td>
                    <Td>{item.email}</Td>
                    <Td isNumeric>{item.position}</Td>
                    <Td isNumeric>{item.ratings}</Td>
                    <Td isNumeric>{item.wage}</Td>
                    <Td><Button bgColor={'#B0D4B8'} onClick={() => handleEdit(index)}>Chỉnh sửa </Button> </Td>
                    <Td><Button bgColor={'#BF0209'} onClick={() => handleDelete(index)}>Xoá </Button></Td>
              </Tr>
              )
              
            })}
            
          </Tbody>
          
        </Table>
      </TableContainer>
    </Box>
  );
};

export default QuanLyNhanVienComoponent;
