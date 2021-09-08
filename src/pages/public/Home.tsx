import React from 'react'
import { RouteComponentProps } from "@reach/router"
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

export default function Home(props: RouteComponentProps) {
  return (
    <Container>
      <Typography variant="h3">This is the Home page where everyone will land</Typography>
      <Typography variant="h2">Where are all the robots at?!</Typography>
    </Container>
  )
}
