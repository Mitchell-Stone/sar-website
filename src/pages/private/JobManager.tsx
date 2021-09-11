import React from 'react'
import { RouteComponentProps } from "@reach/router"
// import CreateJob from '../components/jobs/CreateJob'
import NewJob from '../../components/jobs/NewJob'
import Container from '@material-ui/core/Container';

export default function Jobs(props: RouteComponentProps) {

  return (
    <Container maxWidth="lg">
      <h1>JOBS</h1>
      <NewJob />
    </Container>
  )
}
