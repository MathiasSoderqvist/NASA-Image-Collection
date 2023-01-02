import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchPage } from './SearchPage';
import { ShowPage } from './ShowPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SearchPage/>} />
        <Route path='/ShowPage' element={<ShowPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
