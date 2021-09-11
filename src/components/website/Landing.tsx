import React from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}))

export default function Landing() {
  return (
    <Grid>
      <Typography variant="h2">Where are all the robots at?!</Typography>
      <Typography>Just some random text to make it look like there is some content here</Typography>
    </Grid>
  )
}
