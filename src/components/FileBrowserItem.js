import React, { Component } from 'react';
import { PropTypes } from 'prop-types'; 
import style from './style';
import TreeItem from '@material-ui/lab/TreeItem'

const TypeFolder = 'folder'
const TypeFile = 'file'

function FileBrowserItem(props) {
    if (props.tp === TypeFile) {
        return (
            <TreeItem
                nodeId={props.id}
                label={getBasename(props.path)}
                tp={props.tp}
                path={props.path}
                key={props.id.toString()}
                onLabelClick={props.setData}
            />
        )
    }
    else if  (props.tp === TypeFolder) {
        if (props.contents.length === 0) {
            return (
                <TreeItem
                nodeId={props.id}
                label={getBasename(props.path)}
                tp={props.tp}
                path={props.path}
                />
            )
        }

        let children = props.contents.map(
            content => FileBrowserItem(content)
        )
        return (
            <TreeItem
                nodeId={props.id}
                label={getBasename(props.path)}
                tp={props.tp}
                path={props.path}
            >
                {children}
            </TreeItem>
        )
    }
}

function getBasename(path) {
    return path.split('/').reverse()[0]
}

FileBrowserItem.propTypes = {
    tp: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    contents: PropTypes.array,
    checked: PropTypes.bool,
    reqGetContents: PropTypes.func,
};

export default FileBrowserItem
