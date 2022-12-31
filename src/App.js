import nasaLogo from './nasa.svg';
import { useState } from 'react';
import { getSearch } from './ApiService';
import './App.css';
import { styled, alpha } from '@mui/material/styles';
import { Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

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
      {/* map search result tile */}
          <ImageList sx={{ width: 500, height: 450 }}>
            <ImageListItem key="Subheader" cols={2}>
              <ListSubheader component="div">Search Results</ListSubheader>
            </ImageListItem>
            {searchResults.map((item) => (
              <ImageListItem key={item.data[0].nasa_id}>
                <img
                  src={item.links[0].href}
                  alt={item.data[0].title ?? 'placeholder'}
                />
                <ImageListItemBar
                  title={item.data[0].title}
                  subtitle={item.data[0].description}
                  actionIcon={
                    <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${item.data[0].title}`}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                  />
              </ImageListItem>
            ))}
          </ImageList>
      </header>
    </div>
  );
}

export default App;
