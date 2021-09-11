import React from 'react'
import { makeStyles, ThemeProvider, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    justifyContent: 'center',
    textAlign: 'center',
  }
}))

/**
 * 
 * @returns Section that fits the content on the main page of the website
 */
export default function Section(props: any) {
  const { children, type, height } = props
  const theme = useTheme()
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root} style={{
        height: height,
        backgroundColor: type === 'primary'
          ? theme.palette.primary.main
          : theme.palette.secondary.main,
        color: type === 'primary'
          ? "white"
          : "black"
      }}>
        <div className={classes.content}>
          {children}
        </div>
      </div>
    </ThemeProvider>
  )
}
