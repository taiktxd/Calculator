import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'


const ToDoListComponent = () => {

  /**
   * ToDo list
   * khi nguoi dung them viec can lam useState() thi se show ra list viec lam useState([])
   * khi add trong thi thong bao lỗi, khi add được thì xoá kí tự
   * 
   */

    const [input, setInput] = useState('')
    const [ todo, setTodo] = useState([])
    const [validate, setValidate] = useState(true)
    


    const removeDiacritics = (str) => {
          return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      }

    const handleChangeAdd = () => {
      if(input.trim() !== '') {
        
        const newInput = removeDiacritics(input.toLowerCase().replace(/\s+/g, ""));
        const newToDo = todo.filter(item => {
          const newItem = removeDiacritics(item.toLowerCase().replace(/\s+/g, ""));
          
          return newItem === newInput
                   
        })

        

        const contains = newToDo.includes(newInput);
        
        
        if(newToDo.length !== 0 || contains === false) {
          alert('Việc làm này đã có.')
          setInput('')
        }else {
          
            setInput('')
          setTodo([...todo, input])
          setValidate(true)
          
          
        }

          
        

       
      } else {
        setValidate(false)
      }
    }

    const handleChangeInput = (e) => {
        setInput(e.target.value)
    }

    const handleChangeDelete = (index) => {
      const newTodo = todo.filter((_, i) => i !== index) 
      setTodo(newTodo)
    }

    const handleChangeClearAll = () => {
      setTodo([])
    }
 
  return (
    <Box  background={'linear-gradient(to bottom, #00FFCC, #0000FF)'} p={50}>
      <Flex flexDirection={'column'}  gap={5} w={'400px'} m={'0 auto'} bgColor={'white'} p={5} borderRadius={10}>
        <Text  fontSize={26} fontWeight={700}>ToDo App</Text>

        <Flex > 
          <Box>
          <Input w={'250px'} border={validate ? 'none' : '1px solid red' } value={input} placeholder={'Nhập việc muốn hoàn thành'} onChange={(evnet) => handleChangeInput(evnet)} />
          <Text display={validate ? 'none' : 'block' } pl={'5px'} color={'red'} fontSize={12}>Vui lòng không để trống</Text>
          </Box>
          <Button ml={'10px'} color={'white'} bgColor={'#8E4BE8'} onClick={() => handleChangeAdd()}>Add</Button>
        </Flex>

        <Box>
          {todo.map((item, index) => {
            return (
              <Flex w={'300px'}  fontWeight={600}  borderRadius={'5px'} p={'10px'} bgColor={'#F3F1F4'} cursor={'pointer'} alignItems={'center'} justifyContent={'space-between'}>
                <Text fontSize={16}>
                {item}
                </Text>
                <DeleteIcon color={'red'} fontSize={18} onClick={() => handleChangeDelete(index)}/>
            </Flex>
            )
          })}
          
        </Box>

        <Flex justifyContent={'space-between'}>
          <Box></Box>
        <Button  w={100} color={'white'} bgColor={'#8E4BE8'} onClick={() => handleChangeClearAll()}>Clear All</Button>
        </Flex>
      </Flex>
    </Box>
  )
}

export default ToDoListComponent
