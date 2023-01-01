import nasaLogo from './nasa.svg';
import { useState } from 'react';
import { getSearch } from './ApiService';
import './App.css';
import { styled, alpha } from '@mui/material/styles';
import { Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { SearchResultList } from './SearchResultList';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function App() {
  let [searchResults, setSearchResults] = useState([]);

  const onSubmitSearch = (val) => {
    val.preventDefault();  

    getSearch(val.currentTarget[0].value)
    .then((data) => setSearchResults(data.collection.items))
    console.log(searchResults);
  };

  // loading
  if (searchResults.length === 0) {
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  }

  return (
    <div className="App">
      <header className="App-header">
        <Typography variant='h1'>
          NASA Image Collection
        </Typography>
        <img src={nasaLogo} className="App-logo" alt="logo" />
        <form onSubmit={onSubmitSearch}>
          <Search>
              <SearchIconWrapper type='submit'>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
        </form>
        <SearchResultList searchResults={searchResults} />
      </header>
    </div>
  );
}

export default App;
