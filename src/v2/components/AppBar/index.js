import React from "react"
import { useHistory } from "react-router-dom"
import AppBar from "@material-ui/core/AppBar"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles((theme) => ({
  returnV1: {
    position: "absolute",
    right: "20px",
  },
}))

const MyAppBar = () => {
  const classes = useStyles()
  const history = useHistory()

  const handleClick = () => {
    history.push("/v1")
  }

  return (
    <div>
      <AppBar
      //position="fixed"
      >
        <Toolbar>
          <Typography variant="h6">新版首頁</Typography>
          <Button
            color="inherit"
            onClick={handleClick}
            className={classes.returnV1}
          >
            返回v1
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default MyAppBar
