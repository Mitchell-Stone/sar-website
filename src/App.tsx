import React from 'react';
import NavBar from './components/navigation/NavBar'
import { Router } from "@reach/router"
import Home from "./pages/public/Home"
import Projects from "./pages/public/Blog"
import About from "./pages/public/About"
import Jobs from "./pages/private/Jobs"
import Dashboard from "./pages/private/Dashboard"

function App() {
  return (
    <div>
      <NavBar>
        <Router>
          <Home path="/" />
          <Projects path="/blog" />
          <About path="/about" />
          <Jobs path="/jobs" />
          <Dashboard path="/dashboard" />
        </Router>
      </NavBar>
    </div>
  );
}

export default App;


