import React from 'react'
import { RouteComponentProps } from "@reach/router"
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';


export default function Projects(props: RouteComponentProps) {
  return (
    <Container>
      <Typography variant="h3">Maybe some sort of blog?</Typography>
      <Typography variant="h6">There could be images of progress and some chat about whats going on</Typography>
    </Container>
  )
}
