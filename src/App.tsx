import React, { useEffect, useState } from 'react';
import NavBar from './components/layout/NavBar'
import { Router, Redirect } from "@reach/router"
import Home from "./pages/public/Home"
import JobManager from "./pages/private/JobManager"
import Dashboard from "./pages/private/Dashboard"
import SignIn from "./components/authentication/SignIn"
import Mower from "./components/website/projects/mower/Index"
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { UserContext } from './contexts/userContext';
import { Auth } from 'aws-amplify';

const primaryTheme = createTheme({
  palette: {
    primary: {
      main: '#031424',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
});

interface IUserContext {
  signedIn: boolean
  message?: string
  data?: object | undefined
}

function App() {
  const [user, setUser] = useState<IUserContext>({ signedIn: false, message: 'No valid auth' })
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => setUser({ signedIn: true, data: user }))
      .catch(err => setUser({ signedIn: false, message: err }))
  }, [])

  return (
    <div>
      <UserContext.Provider value={{ user, setUser }}>
        <ThemeProvider theme={primaryTheme}>
          <NavBar>
            <Router>
              <SignIn path="/signin" />
              <Home path="/" />
              {user.signedIn
                ? <>
                  <JobManager path="/job-manager" />
                  <Dashboard path="/dashboard" />
                </>
                : <>
                  <Redirect from="/job-manager" to="/signin" noThrow />
                  <Redirect from="/dashboard" to="/signin" noThrow />
                </>
              }
            </Router>
          </NavBar>
        </ThemeProvider>
      </UserContext.Provider>
    </div>
  );
}

export default App;


