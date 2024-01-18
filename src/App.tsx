import { HashRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/Home';
import Nav from './components/Nav/Nav';
import Spec from './routes/spec/Spec';
import Footer from './components/Footer/Footer';
import { useEffect } from 'react';
import aoLightFavicon from '/images/ao-pictograph_light.svg?url';
import aoDarkFavicon from '/images/ao-pictograph_light.svg?url';

function App() {
  useEffect(() => {
    const favicon = document.getElementById('favicon') as HTMLLinkElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const setColorScheme = () => {
      if (mediaQuery.matches) {
        favicon.href = aoDarkFavicon;
        console.log('dark');
      } else {
        favicon.href = aoLightFavicon;
        console.log('light');
      }
    };

    setColorScheme();

    mediaQuery.addEventListener('change', setColorScheme);

    return () => mediaQuery.removeEventListener('change', setColorScheme);
  }, []);
  return (
    <HashRouter>
      <Nav />
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/spec'} element={<Spec />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
