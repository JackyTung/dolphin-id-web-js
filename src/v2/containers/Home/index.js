import React from "react"
import Container from "@material-ui/core/Container"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "v2/components/AppBar"
import AnnotationTool from "v2/containers/AnnotationTool"
import FolderGetter from "v2/containers/FolderGetter"

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}))

const Content = () => {
  const classes = useStyles()
  return (
    <Container>
      <div className={classes.toolbar} />
      <FolderGetter />
      <AnnotationTool />
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
