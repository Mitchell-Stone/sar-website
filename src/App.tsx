import React from 'react';
import NavBar from './components/layout/NavBar'
import { Router } from "@reach/router"
import Home from "./pages/public/Home"
import Projects from "./pages/public/Blog"
import About from "./pages/public/About"
import Jobs from "./pages/private/JobManager"
import Dashboard from "./pages/private/Dashboard"
import SignIn from "./components/authentication/SignIn"
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const primaryTheme = createTheme({
  palette: {
    primary: {
      main: blue[700],
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
});

function App() {
  return (
    <div>
      <ThemeProvider theme={primaryTheme}>
        <NavBar>
          <Router>
            <SignIn path="/signin" />
            <Home path="/" />
            <Projects path="/blog" />
            <About path="/about" />
            <Jobs path="/jobs" />
            <Dashboard path="/dashboard" />
          </Router>
        </NavBar>
      </ThemeProvider>
    </div>
  );
}

export default App;


