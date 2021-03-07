import React from "react"
import TreeItem from "@material-ui/lab/TreeItem"
import { PropTypes } from "prop-types"

import ConnectedFileBrowserItem from "../containers/ConnectedFileBrowserItem"
import * as utils from "../utils"

const TypeFolder = "folder"
const TypeFile = "file"

function FileBrowserItem(props) {
  console.log(props)
  const label = utils.getBasename(props.path)

  if (props.tp === TypeFile) {
    return (
      <TreeItem
        nodeId={props.id}
        label={label}
        tp={props.tp}
        path={props.path}
        key={props.id.toString()}
        onLabelClick={props.setData}
      />
    )
  } else if (props.tp === TypeFolder) {
    if (props.contents.length === 0) {
      return (
        <TreeItem
          nodeId={props.id}
          label={label}
          tp={props.tp}
          path={props.path}
          key={props.id.toString()}
          onLabelClick={props.fetchListFolderBegin}
        />
      )
    }

    console.log(props.contents)
    let children = props.contents.map((content) => (
      <ConnectedFileBrowserItem {...content} key={content.id} />
    ))
    console.log("Test File Browser Item")
    console.log(children)
    return (
      <TreeItem nodeId={props.id} label={label} tp={props.tp} path={props.path}>
        {children}
      </TreeItem>
    )
  }
}

FileBrowserItem.propTypes = {
  tp: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  contents: PropTypes.array,
  checked: PropTypes.bool,
  reqGetContents: PropTypes.func,
}

export default FileBrowserItem
