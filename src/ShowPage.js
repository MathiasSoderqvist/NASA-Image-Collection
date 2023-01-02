import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useContext } from 'react';
import { ShowPageItemContext } from './ShowPageItemContext';
import { Stack } from '@mui/material';

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
  
  const dateCreated = showPageItem.data[0].date_created.substring(0, 10);
  const keywords = showPageItem.data[0].keywords.join(', ');

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const goBack = () => {
    window.history.back();
  };
  
  return (
    <Stack justifyContent={'center'} alignItems='center'>
      <button onClick={goBack}>Back to Search</button>
      <Card sx={{ maxWidth: 350, marginTop: '5rem' }} >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              NASA
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={showPageItem.data[0].title}
          subheader={dateCreated}
        />
        <CardMedia
          component="img"
          height="194"
          image={showPageItem.links[0].href}
          alt={showPageItem.data[0].title}
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
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography fontWeight={600} paragraph>
              {showPageItem.data[0].description}
            </Typography>
            <Typography paragraph>
              Keywords: {keywords}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Stack>
  );
}