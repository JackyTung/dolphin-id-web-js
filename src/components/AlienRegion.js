import React, { Component } from 'react';
import { PropTypes } from 'prop-types'; 
import style from './style';
import * as c from '../const';

function AlienRegion(props) {
	const localStyle = {
		width: props.width + '%',
		height: props.height + '%',
		left: props.x + '%',
		top: props.y + '%'
	};

	let corners = (
			<div>
				<div data-dir={c.LOWER_RIGHT} style={style.RegionHandleSE} />
				<div data-dir={c.LOWER_LEFT} style={style.RegionHandleSW} />
				<div data-dir={c.UPPER_LEFT} style={style.RegionHandleNW} />
				<div data-dir={c.UPPER_RIGHT} style={style.RegionHandleNE} />
			</div> 
		)

// 	onRegionMoveStart (event, index) {
// 		console.log('>>> Move Index:' + index)
// // 		if (!this.isInExistedRegion(event)) {
// // 			return;
// // 		}
// 
// 		event.preventDefault();
// 
// 		const clientPos = this.getClientPos(event);
// 		const imageOffset = this.getElementOffset(this.refs.image);
// 
// 		// Note that the x, y, width, height of currentRegion are all percentage.
// 		const currentRegion = this.props.region;
// 		const regionLeft = ((currentRegion.x / 100) * this.refs.image.offsetWidth) + imageOffset.left;
// 		const regionTop = ((currentRegion.y / 100) * this.refs.image.offsetHeight) + imageOffset.top;
// 		const regionWidth = ((currentRegion.width / 100) * this.refs.image.offsetWidth);
// 		const regionHeight = ((currentRegion.height / 100) * this.refs.image.offsetHeight);
// 
// 		this.props.moveRegionDispatch(
// 			this.props.region.data.index,
// 			
// 		)

// 		const clientPosXOffset = regionLeft - clientPos.x;
// 		const clientPosYOffset = regionTop - clientPos.y;

// 		const resizeDir = event.target.dataset.dir;
// 
// 		let regionChangeData = {
// 			clientPosXOffset: clientPosXOffset,
// 			clientPosYOffset: clientPosYOffset,
// 			imageOffsetLeft: imageOffset.left,
// 			imageOffsetTop: imageOffset.top,
// 			imageWidth: this.refs.image.offsetWidth,
// 			imageHeight: this.refs.image.offsetHeight,
// 			changeState: resizeDir? RegionChangeState.Resize : RegionChangeState.Move,
// 			resizeDir: resizeDir
// 		};
// 
// 		if (resizeDir) {
// 			regionChangeData.oppositeCorner = this.getOppositeCorner(
// 				resizeDir,
// 				regionLeft,
// 				regionTop,
// 				regionWidth,
// 				regionHeight,
// 			)
// 		} else {
// 			regionChangeData.oldClientPos = clientPos
// 		}

// 		this.isChanging = true;
// 		this.regionChangeIndex = index;
// 		this.regionChangeData = regionChangeData

		
// 	}

	let colorStyle = {
		background: c.COLOR_DEFAULT
	}
	if (props.target 
		&& props.target.index >= 0 
		&& props.index === props.target.index) {
		colorStyle.background = c.COLOR_SELECTED
	}

	return (
		<div
			style={Object.assign(
				{}, 
				style.Region, 
				localStyle,
				colorStyle, 
// 				props.customStyle, 
// 				props.data.regionStyle
			)}
// 			onTouchStart={props.onCropStart}
			onMouseDown={
				(event) => {
					const clientPos = props.getClientPosInImage(event)
			
				    if (event.target.dataset.dir) {
						props.setRegionStateResizeDispatch(
							props.index,
							event.target.dataset.dir,
						)
					} else {
						props.setRegionStateMoveDispatch(
							props.index,
							props.x,
							props.y,
							clientPos.x,
							clientPos.y,
						)
					}
				}
			}
			data-wrapper="wrapper"
			>
			{corners}
		</div>
	);
} 

// function renderCornerHandles() {
// 	return (
// 		<div>
// 			<div data-dir='se' style={style.RegionHandleSE} />
// 			<div data-dir='sw' style={style.RegionHandleSW} />
// 			<div data-dir='nw' style={style.RegionHandleNW} />
// 			<div data-dir='ne' style={style.RegionHandleNE} />
// 		</div>
// 	);
// }

AlienRegion.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	index: PropTypes.number.isRequired,
// 	onCropStart: PropTypes.func.isRequired,
// 	handles: PropTypes.bool,
// 	changing: PropTypes.bool,
// 	dataRenderer: PropTypes.func,
// 	data: PropTypes.object,
// 	customStyle: PropTypes.object
};

export default AlienRegion
