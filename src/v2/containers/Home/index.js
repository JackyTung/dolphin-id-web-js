import React from "react"
import Box from "@material-ui/core/Box"
import Container from "@material-ui/core/Container"
import { makeStyles } from "@material-ui/core/styles"

import AppBar from "../../components/AppBar"

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}))

const Content = () => {
  const classes = useStyles()
  return (
    <Container>
      <div className={classes.toolbar} />
      <Box my={2}>This is content</Box>
    </Container>
  )
}

const Home = () => {
  return (
    <div>
      <AppBar />
      <Content />
    </div>
  )
}

export default Home
