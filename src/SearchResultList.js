import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Grid from '@mui/material/Grid';

export const SearchResultList = ({ searchResults }) => {

  return (
    <Grid container spacing={2} justifyContent='center' marginTop={'2rem'}>
        <ImageList sx={{ width: '30rem', height: '30rem' }} >
          <ImageListItem key="Subheader" cols={2}>
            <ListSubheader component="div">Search Results</ListSubheader>
          </ImageListItem>
          {searchResults.map((item) => (
            // fix background color
            <button onClick={() => console.log(item.data)} sx={{ backgroundColor: 'none' }}>
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
            </button>
          ))}
        </ImageList>
    </Grid>
  );
}
