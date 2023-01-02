import '../App.css';
import { useState } from 'react';

import nasaLogo from '../nasa.svg';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { getSearch } from '../ApiService';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { SearchResultList } from './SearchResultList';
import CircularProgress from '@mui/material/CircularProgress';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
    [theme.breakpoints.up('md')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

export const SearchPage = () => {
  let [yearEnd, setYearEnd] = useState();
  let [yearStart, setYearStart] = useState();
  let [loading, setLoading] = useState(false);
  let [searchResults, setSearchResults] = useState([]);

  const onSubmitSearch = (val) => {
    val.preventDefault();  
    setLoading(true);
    const finalYearStart = yearStart ? yearStart.getFullYear().toString() : '';
    const finalYearEnd = yearEnd ? yearEnd.getFullYear().toString() : '';

    getSearch(val.currentTarget[0].value, finalYearStart, finalYearEnd)
    .then((data) => setSearchResults(data.collection.items))
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Typography variant='h1'>
          <span><img src={nasaLogo} className="App-logo" alt="logo" /> Image Collection</span>
        </Typography>
        <Stack margin={'4rem'} flexDirection='row' justifyContent={'space-between'}>
         <DatePicker
            views={['year']}
            value={yearStart}
            label="Search Start Year"
            onChange={(newValue) => {
              setYearStart(newValue);
            }}
            renderInput={(params) => <TextField {...params} helperText={null} />}
          />
          <DatePicker
            value={yearEnd}
            views={['year']}
            label="Search End Year"
            onChange={(newValue) => {
              setYearEnd(newValue);
            }}
            renderInput={(params) => <TextField {...params} helperText={null} />}
          />
        </Stack>
        <form onSubmit={onSubmitSearch}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Button 
            type='submit' 
            variant='outlined'  
            style={{minWidth: '8rem', marginTop: '2rem'}} 
          >
            Search
          </Button>
        </form>
        {loading ? 
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box> 
          :
          <SearchResultList searchResults={searchResults} />
        }
      </header>
    </div>
  );
}