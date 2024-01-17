import { HashRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/Home';
import Nav from './components/Nav/Nav';
import Specs from './routes/spec/Spec';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <HashRouter>
      <Nav />
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/spec'} element={<Specs />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
