import React, { useContext } from 'react'
import { RouteComponentProps, navigate } from "@reach/router"
// import CreateJob from '../components/jobs/CreateJob'
import NewJob from '../../components/jobs/NewJob'
import Container from '@material-ui/core/Container';
import { UserContext } from "../../contexts/userContext"


function Jobs(props: RouteComponentProps) {
  const { user, setUser } = useContext(UserContext)

  return (
    user.signedIn &&
    <Container maxWidth="lg">
      <h1>JOBS</h1>
      <NewJob />
    </Container>)
}

export default Jobs
