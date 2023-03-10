import * as React from 'react';
import { useContext } from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import ImageList from '@mui/material/ImageList';
import IconButton from '@mui/material/IconButton';
import ListSubheader from '@mui/material/ListSubheader';
import ImageListItem from '@mui/material/ImageListItem';
import { ShowPageItemContext } from '../ShowPageItemContext';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export const SearchResultList = ({ searchResults, loaded }) => {
  //showpageitem context
  const {showPageItem, setShowPageItem} = useContext(ShowPageItemContext);
  const navigate = useNavigate();

  const handleClick = (item) => {
    Object.keys(searchResults).forEach((key) => {
      if (item.target.currentSrc === searchResults[key].links[0].href) {
        setShowPageItem(searchResults[key]);
      }
    });
    item.preventDefault();
    navigate('/ShowPage');
  }
  
  const noResults = () => {
  if (loaded && !searchResults.length) {
    return(
      <Typography marginTop={'2rem'}>
        No results found. Please try again.
      </Typography>
    )
    } else {
      return null;
    }
  }
  return (
    <>
      <div marginTop={'2rem'}>
        {noResults()}
      </div>
      <Grid container spacing={2} justifyContent='center' marginTop={'2rem'} xs={12} sm={7} md={6}>
        <ImageList sx={{ width: '60rem', height: '30rem' }}  xs={12} sm={7} md={6}>
          {searchResults.length ? 
            <ImageListItem key='Subheader' cols={2}>
              <ListSubheader component='div'>Search Results</ListSubheader>
            </ImageListItem>
            :
            null
          }
          {searchResults.map((item) => (
            <ImageListItem key={item.data[0].nasa_id} onClick={handleClick}>
              <img
                src={item.links[0].href}
                alt={item.data[0].title ?? 'placeholder'}
              />
              <ImageListItemBar
                title={item.data[0].title}
                subtitle={`By ${item.data[0].photographer} at ${item.data[0].location}`}
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
      </Grid>
    </>
  );
}
