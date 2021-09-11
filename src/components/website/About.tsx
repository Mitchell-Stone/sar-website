import React from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}))

export default function About() {
  return (
    <Grid>
      <Typography variant="h2">This is the reason why we are here</Typography>
      <Typography>Just some random text to make it look like there is some content here</Typography>
    </Grid>
  )
}
