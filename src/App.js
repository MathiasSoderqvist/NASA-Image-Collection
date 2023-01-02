import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchPage } from './SearchPage';
import { ShowPage } from './ShowPage';
import { ShowPageItemContext } from './ShowPageItemContext';
import { useMemo, useState } from 'react';

const App = () => {
  const [showPageItem, setShowPageItem] = useState();
  const value = useMemo(
    () => ({ showPageItem, setShowPageItem }), 
    [showPageItem, setShowPageItem]
  );

  return (
    <ShowPageItemContext.Provider value={value}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SearchPage/>} />
          <Route path='/ShowPage' element={<ShowPage/>} />
        </Routes>
      </BrowserRouter>
    </ShowPageItemContext.Provider>
  );
}

export default App;
