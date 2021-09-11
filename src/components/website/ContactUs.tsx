import React from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}))

export default function ContactUs() {
  return (
    <Grid>
      <Typography variant="h2">Want to talk more?</Typography>
      <Typography>Feel free to contact us</Typography>
    </Grid>
  )
}
