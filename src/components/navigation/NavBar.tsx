import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { mainListItems, secondaryListItems } from './NavigationMenu'
import logo from "../images/logo-white.svg"
import { Link } from "@reach/router"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  logo: {
    width: 50,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  navigation: {
    display: 'flex',
    alignItems: 'center'
  },
  navItem: {
    marginLeft: theme.spacing(4)
  },
  title: {
    marginLeft: theme.spacing(4)
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  }, button: {
    marginRight: theme.spacing(2)
  }
}));

const pages = [
  {
    url: "/about",
    title: "About Us"
  },
  {
    url: "/blog",
    title: "Blog"
  }
]

export default function NavBar(props: any) {
  const { children } = props
  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(true)

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const toggleSignIn = () => {
    signedIn ? setSignedIn(false) : setSignedIn(true)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {signedIn &&
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
          }
          <Container maxWidth="xl">
            <Grid container>
              <Grid item xs className={classes.logoContainer}>
                <Link to="/">
                  <img src={logo} className={classes.logo} />
                </Link>
                <Typography variant="h5" noWrap className={classes.title}>
                  Stone Armour Robotics
                </Typography>
              </Grid>
              <Grid item xs className={classes.navigation}>
                {pages.map(page =>
                  <Typography variant="h6" noWrap className={classes.navItem}>
                    <Link to={page.url}>
                      {page.title}
                    </Link>
                  </Typography>
                )}
              </Grid>
              <Grid item xs className={classes.buttons}>
                <Button variant="outlined" color="inherit" className={classes.button}>
                  Sign Up
                </Button>
                <Button variant="outlined" color="inherit" onClick={toggleSignIn}>
                  {!signedIn ? "Sign In" : "Sign Out"}
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
      {signedIn &&
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
      }
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  )
}

