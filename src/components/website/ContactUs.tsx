import React from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  content: {
    display: 'flex',
  },
  item: {
    margin: theme.spacing(2)
  }
}))

export default function ContactUs() {
  const classes = useStyles();
  return (
    <Grid>
      <Typography variant="h2">Want to talk more?</Typography>
      <Grid className={classes.content}>
        <Grid className={classes.item}>
          <Typography>EMAIL</Typography>
          <Typography>admin@stonearmourrobotics.com.au</Typography>
        </Grid>
        <Grid className={classes.item}>
          <Typography>HOME BASE</Typography>
          <Typography>Gold Coast, Queensland, Australia</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
