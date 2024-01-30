import { HashRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/Home';
import Nav from './components/Nav/Nav';
import Spec from './routes/spec/Spec';
import Footer from './components/Footer/Footer';
import { useEffect } from 'react';
import { setColorScheme } from './components/HelperFunctions/setColorScheme';
// import Scan from './routes/scan/Scan';

function App() {
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    setColorScheme(mediaQuery);

    mediaQuery.addEventListener('change', (event) => setColorScheme(event));

    return () =>
      mediaQuery.removeEventListener('change', (event) =>
        setColorScheme(event)
      );
  }, []);
  return (
    <HashRouter>
      <Nav />
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/spec'} element={<Spec />} />
        {/* <Route path={'/scan'} element={<Scan />} /> */}
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
