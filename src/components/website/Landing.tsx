import React from 'react'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles';
import BackgroundImage from "../../images/backgrounds/MowerRenderSquare.png"

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  background: {
    width: '25vw',
    minWidth: '250px',
    margin: theme.spacing(5)
  },
  header: {
    fontSize: '85px',
  },
  body: {
    fontSize: '30px',
  }
}))

export default function Landing() {
  const classes = useStyles();
  return (
    <Container >
      <Typography variant="h1">Stone Armour Robotics!</Typography>
      <Container maxWidth="md">
        <Typography variant="h5">Where small ideas turn into big ideas and big ideas come to life</Typography>
      </Container>
      <img src={BackgroundImage} className={classes.background} />

    </Container>
  )
}
