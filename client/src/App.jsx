import './App.css';

// HOC Imports
import HomeLayoutHoc from './HOC/Home.hoc';

//Pages
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <HomeLayoutHoc component={HomePage} path="/" />
    </>
  );
}

export default App;
