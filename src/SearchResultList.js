import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import ImageList from '@mui/material/ImageList';
import IconButton from '@mui/material/IconButton';
import ListSubheader from '@mui/material/ListSubheader';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export const SearchResultList = ({ searchResults }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/ShowPage');
  }

  return (
      <Grid container spacing={2} justifyContent='center' marginTop={'2rem'} xs={12} sm={7} md={6}>
          <ImageList sx={{ width: '60rem', height: '30rem' }}  xs={12} sm={7} md={6}>
            <ImageListItem key="Subheader" cols={2}>
              <ListSubheader component="div">Search Results</ListSubheader>
            </ImageListItem>
            {searchResults.map((item) => (
              // fix background color
              <button to='/' onClick={handleClick} sx={{ backgroundColor: 'none' }}>
                <ImageListItem key={item.data[0].nasa_id}>
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
              </button>
            ))}
          </ImageList>
      </Grid>
  );
}
