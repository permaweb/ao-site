import { HashRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/Home';
import Nav from './components/Nav/Nav';
import Specs from './routes/specs/Specs';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <HashRouter>
      <Nav />
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/specs'} element={<Specs />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
