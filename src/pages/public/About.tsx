import React from 'react'
import { RouteComponentProps } from "@reach/router"
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';


export default function About(props: RouteComponentProps) {
  return (
    <Container>
      <Typography variant="h3">Want to learn more about the people?</Typography>
    </Container>
  )
}
