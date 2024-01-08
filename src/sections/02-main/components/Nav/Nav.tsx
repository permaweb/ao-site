import './Nav.css';

const Nav = () => {
  return (
    <header>
      <nav>
        <p>Logo</p>
        <div className="nav-buttons">
          <button>Docs</button>
          <button>Specs</button>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
