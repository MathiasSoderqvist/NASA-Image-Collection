import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchPage } from './SearchPage';
import { ShowPage } from './ShowPage';
import { ShowPageItemContext } from './ShowPageItemContext';
import { useMemo, useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from "@mui/x-date-pickers";

const App = () => {
  const [showPageItem, setShowPageItem] = useState();
  const value = useMemo(
    () => ({ showPageItem, setShowPageItem }), 
    [showPageItem, setShowPageItem]
  );

  return (
    <ShowPageItemContext.Provider value={value}>
      <LocalizationProvider dateAdapter={AdapterDateFns} utils={DateFnsUtils}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<SearchPage/>} />
            <Route path='/ShowPage' element={<ShowPage/>} />
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </ShowPageItemContext.Provider>
  );
}

export default App;
