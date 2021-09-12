import React, { useReducer, useContext, useEffect } from 'react';
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
import { Link, navigate } from "@reach/router"
import { UserContext } from "../../contexts/userContext"
import { signOut } from '../authentication/amplify/auth'

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
      width: theme.spacing(7) + 1,
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
    // marginTop: theme.spacing(4)

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
  },
  button: {
    marginRight: theme.spacing(2)
  }
}));

enum ACTIONS {
  SIGNING_IN,
  SIDE_NAV_TOGGLE
}

function reducer(state: any, action: any) {
  switch (action.type) {
    case ACTIONS.SIGNING_IN: {
      return {
        ...state,
        allProperties: action.payload
      }
    }
    case ACTIONS.SIDE_NAV_TOGGLE: {
      return {
        ...state,
        drawerOpen: action.payload
      }
    }
    default:
      throw new Error("Unkown Action Type")
  }
}

const initialState = {
  drawerOpen: false
};

export default function NavBar(props: any) {
  const { children } = props
  const [state, dispatch] = useReducer(reducer, initialState)
  const { user, setUser } = useContext(UserContext)
  const theme = useTheme();
  const classes = useStyles();

  const toggleDrawerOpen = () => {
    dispatch({
      type: ACTIONS.SIDE_NAV_TOGGLE,
      payload: state.drawerOpen === true ? false : true
    })
  };

  const handleSignOut = () => {
    signOut().then(() => {
      setUser({ signedIn: false, message: 'Logged out' })
      navigate('/')
    })
  }

  return (
    <div className={classes.root} >
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: state.drawerOpen,
        })}
      >
        <Toolbar>
          {user.signedIn === true &&
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: state.drawerOpen,
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
              <Grid item xs className={classes.buttons}>
                <Button variant="outlined" color="inherit" onClick={() => console.log('UserContext', user)}>
                  Details
                </Button>
                {user.signedIn == false
                  ? <Button variant="outlined" color="inherit" onClick={() => navigate("/signin")}>
                    Sign In
                  </Button>
                  : <Button variant="outlined" color="inherit" onClick={() => handleSignOut()}>
                    Sign Out
                  </Button>
                }
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
      {user.signedIn == true &&
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: state.drawerOpen,
            [classes.drawerClose]: !state.drawerOpen,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: state.drawerOpen,
              [classes.drawerClose]: !state.drawerOpen,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={toggleDrawerOpen}>
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

