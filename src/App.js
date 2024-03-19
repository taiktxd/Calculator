import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './Layout/Home';
import About from './Layout/About';
import Contact from './Layout/Contact';
import Layout from './Layout/Layout';
import Header from './Layout/Header';
import Payment from './Layout/Payment';

function App() {
  return (
    <Router>
      {/* cách cũ */}
      <Route exact path='/'>
        <Layout>
          <Home />
        </Layout>
      </Route>

      {/* cách cũ */}
      <Route path='/about'>
        <Header />

        <About />
      </Route>

      <Route path='/contact'>
        <Layout>
          <Contact />
        </Layout>
      </Route>
      <Route path='/pay'>
        <Payment />
      </Route>
    </Router>
  );
}

export default App;
