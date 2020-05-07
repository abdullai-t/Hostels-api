import React from "react";
import {makeStyles, Card, CardMedia,CardActions,IconButton, Grid} from '@material-ui/core'
import img from '../img/b.jpg'



const useStyles = makeStyles(theme => ({
  root: {
    margin:"1%"
  },
  all: {
    flexGrow: 1,
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  Card:{
    padding: theme.spacing(2),
  }
}));

export default function RecipeReviewCard() {
  const classes = useStyles();

  return (
        <div className={classes.all}>
            <Grid container >
                <Grid item xs={12} md={4}>
                    <Card className={classes.root}>
                    <CardMedia
                        className={classes.media}
                        image={img}
                        title="Paella dish"
                    />
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                        Ayeduase
                        </IconButton>
                    </CardActions>
                    </Card>
                </Grid>
            </Grid>
       </div>




  );
}
