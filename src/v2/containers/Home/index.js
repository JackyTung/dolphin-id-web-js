import React from "react"
import Container from "@material-ui/core/Container"
import { makeStyles } from "@material-ui/core/styles"

import AppBar from "../../components/AppBar"
import FolderGetter from "../FolderGetter"

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}))

const Content = () => {
  const classes = useStyles()
  return (
    <Container>
      <div className={classes.toolbar} />
      <FolderGetter />
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
