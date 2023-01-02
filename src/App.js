import { useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DateFnsUtils from '@date-io/date-fns';
import { ShowPage } from './Components/ShowPage';
import { SearchPage } from './Components/SearchPage';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ShowPageItemContext } from './ShowPageItemContext';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

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
