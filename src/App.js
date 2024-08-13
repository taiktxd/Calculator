import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import { ChakraProvider } from '@chakra-ui/react';
import CalculatorComponent from './Components.jsx/CalculatorComponent';
import ToDoListComponent from './Components.jsx/ToDoListComponent';
import QuanLyNhanVienComoponent from './Components.jsx/QuanLyNhanVienComoponent';




function App() {
  


  return (
    <ChakraProvider>
      <QuanLyNhanVienComoponent />
    </ChakraProvider>
  );
}

export default App;
