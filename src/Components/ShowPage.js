import * as React from 'react';
import { useContext } from 'react';

import Card from '@mui/material/Card';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ShowPageItemContext } from '../ShowPageItemContext';

const StyledSpan = styled('span')({
  fontWeight: 'bold',
});

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const ShowPage = () => {
  const [expanded, setExpanded] = React.useState(false);
  const { showPageItem } = useContext(ShowPageItemContext);
  
  const keywords = showPageItem.data[0].keywords.join(', ');
  const dateCreated = showPageItem.data[0].date_created.substring(0, 10);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const goBack = () => {
    window.history.back();
  };
  
  return (
    <Stack justifyContent='center' alignItems='center' backgroundColor='#282c34'sx={{ minHeight: '100vh' }}>
      <Button variant='contained' onClick={goBack} sx={{ marginTop: '5rem' }}>Back to Search</Button>
      <Card sx={{ maxWidth: 350, marginTop: '5rem', marginBottom: '5rem' }} >
        <CardHeader
          subheader={dateCreated}
          title={showPageItem.data[0].title}
          avatar={
            <Avatar src={showPageItem.links[0].href} aria-label={showPageItem.data[0].title} />
          }
        />
        <CardMedia
          height="194"
          component="img"
          alt={showPageItem.data[0].title}
          image={showPageItem.links[0].href}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {showPageItem.data[0].photographer ? showPageItem.data[0].photographer : 'No photographer provided'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {showPageItem.data[0].location ? showPageItem.data[0].location : 'No location provided'}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            aria-label="show more"
            aria-expanded={expanded}
            onClick={handleExpandClick}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography fontStyle='italic' paragraph>
              {showPageItem.data[0].description}
            </Typography>
            <Typography fontStyle='italic'>
              <StyledSpan>Keywords:</StyledSpan> {keywords}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Stack>
  );
}