import { Box, Grid, GridItem, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

const CalculatorComponent = () => {
    

    
    const dataCalculator = [
        {
            number: 'AC',
            isNumber: false
        },
        {
            number: '+/-',
            isNumber: false
        },
        {
            number: '%',
            isNumber: false
        },
        {
            number: '÷',
            isNumber: false
        },
        {
            number: 7,
            isNumber: true
        },
        {
            number: 8,
            isNumber: true
        },
        {
            number: 9,
            isNumber: true
        },
        {
            number: 'x',
            isNumber: false
        },
        {
            number: 4,
            isNumber: true
        },
        {
            number: 5,
            isNumber: true
        },
        {
            number: 6,
            isNumber: true
        },
        {
            number: '-',
            isNumber: false
        },
        {
            number: 1,
            isNumber: true
        },
        {
            number: 2,
            isNumber: true
        },
        {
            number: 3,
            isNumber: true
        },

        {
            number: '+',
            isNumber: false
        },
        {
            number: 0,
            isNumber: true,
            colSpan: 2
        },

        {
            number: ',',
            isNumber: false
        },
        {
            number: '=',
            isNumber: false
        },


    ]

    const [listNumber, setListNumber] = useState([])

    const [listFirst, setListFirst] = useState([])
    const [listSecond, setListSecond] = useState([])

    const [operator, setOperator] = useState('');


    const handleChange = (event) => {
        const value = event.target.innerText;
        if (value === 'AC') {
            if (operator && listSecond) {
                setListSecond(prev => prev.slice(0, -1));
                setListNumber(listFirst + ' ' + operator + ' ' + listSecond.slice(0, -1));
            } else if (operator) {
                setOperator('');
                setListNumber(listFirst);
            } else {
                setListFirst(prev => prev.slice(0, -1));
                setListNumber(listFirst.slice(0, -1));
            }
        } else if (!isNaN(value) || value === ',') {
            if (operator) {
                setListSecond(prev => prev + value);
                setListNumber(listFirst + ' ' + operator + ' ' + listSecond + value);
            } else {
                setListFirst(prev => prev + value);
                setListNumber(listFirst + value);
            }
        } else if (value === '=') {
            try {
                const expression = listFirst + ' ' + operator + ' ' + listSecond;
                const result = eval(expression.replace(/x/g, '*').replace(/÷/g, '/'));
                setListNumber(result.toString());
                setListFirst(result.toString());
                setListSecond('');
                setOperator('');
            } catch (error) {
                setListNumber('Error');
            }
        } else {
            if (operator && listSecond) {
                try {
                    const expression = listFirst + ' ' + operator + ' ' + listSecond;
                    const result = eval(expression.replace(/x/g, '*').replace(/÷/g, '/'));
                    setListFirst(result.toString());
                    setListSecond('');
                    setOperator(value);
                    setListNumber(result.toString() + ' ' + value + ' ');
                } catch (error) {
                    setListNumber('Error');
                }
            } else {
                setOperator(value);
                setListNumber(listFirst + ' ' + value + ' ');
            }
        }
    };

    
  return (
    <Box w={400} h={550} border={'1px solid black'} borderRadius={10} m={'10px auto'}>
        <Box w={380} h={180} border={'1px solid black'}  m={'10px auto'} position={'relative'}>
            <Text fontSize={32} fontWeight={600} position={'absolute'} right={'10px'} top={'20px'}>{listNumber}</Text>
        </Box>

        <Grid color={'white'} templateColumns='repeat(4, 1fr)' gap={6} m={'10px'} textAlign={'center'} fontSize={18} fontWeight={600}>
        {dataCalculator.map(item => {
            return (
                <GridItem w='100%' h='10' bg='gray.500' borderRadius={'5px'} pt={'6px'} 
                 cursor={'pointer'} colSpan={item.colSpan ? item.colSpan : 1} 
                 bgColor={item.isNumber ? 'gray.500' : 'orange.500'} 
                 onClick={(event) => handleChange(event)}>{item.number}</GridItem>
            )
        })}
            
            
        </Grid>
    </Box>
  )
}

export default CalculatorComponent
