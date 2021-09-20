import React from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles';
import MowerCard from './projects/mower/MowerCard'

const useStyles = makeStyles((theme: Theme) => ({
  group: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  heading: {
    padding: theme.spacing(3)
  }
}))

export default function ContactUs() {
  const classes = useStyles();
  return (
    <Grid>
      <Grid className={classes.heading}>
        <Typography variant="h2">What are we working on?</Typography>
      </Grid>
      <Grid className={classes.group}>
        <MowerCard />
      </Grid>
    </Grid>
  )
}
