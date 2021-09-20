import React from 'react'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  header: {
    padding: theme.spacing(2)
  }
}))

export default function About() {
  const classes = useStyles();
  
  return (
    <Grid>
      <Typography variant="h2" className={classes.header}>It all started with a crazy idea!</Typography>
      <Container maxWidth="md">
        <Typography>We are looking to learn, build, and implement new technologies to provide solutions
          to everyday problems. Our journey began with a simple but crazy idea - to connect the world and
          simplify everyday tasks using a network of intelligent machine. We are a small team of innovators
          brought together by the same thirst for learning and creating exciting technology</Typography>
      </Container>
    </Grid>
  )
}
