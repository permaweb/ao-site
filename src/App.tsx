import './App.css';
import Header from './sections/01-header/Header';
import Main from './sections/02-main/Main';
import ColorBox from './sections/02-main/components/ColorBox';
import Footer from './sections/03-footer/Footer';

function App() {
  return (
    <div className="container">
      <Header />
      <Main />
      <Footer />
      <div className="accent-wrapper">
        <div className="color">
          <ColorBox color={'red'} />
          <ColorBox color={'blue'} />
          <ColorBox color={'green'} />
          <ColorBox color={'orange'} />
        </div>
      </div>
    </div>
  );
}

export default App;
