import React, { Component } from 'react';
import { PropTypes } from 'prop-types'; 
import Region from './Region';
import AlienRegion from './AlienRegion'
import ConnectedAlienRegion from '../containers/ConnectedAlienRegion'
import style from './style';
import { REGION_STATE_MOVE, REGION_STATE_RESIZE }  from '../action'
import RegionChangeState from '../const/RegionChangeState';

class AlienRegionSelect extends Component {

	getClientPosInImage(event, image) {
		let clientPos = this.getClientPos(event)
		const imageOffset = this.getElementOffset(image);
		const xPct = ((clientPos.x - imageOffset.left) / image.offsetWidth) * 100;
		const yPct = ((clientPos.y - imageOffset.top) / image.offsetHeight) * 100;
		return {
			x: xPct, 
			y: yPct,
		}
	}

	getClientPos(event) {
		return {
			x: event.pageX,
			y: event.pageY,
		}
	}

 	getElementOffset (element) {
 		const rect = element.getBoundingClientRect();
 		const docEl = document.documentElement;

 		const rectTop = rect.top + window.pageYOffset - docEl.clientTop;
 		const rectLeft = rect.left + window.pageXOffset - docEl.clientLeft;
 
 		return {
 			top: rectTop,
 			left: rectLeft
 		};
 	}

	isInExistedRegion(event) {
		return event.target.dataset.wrapper 
			|| event.target.dataset.dir 
	}
	 
	render () {
		return (
			<div
				ref='image'
				style={style.RegionSelect}
				tabindex='0'
				onMouseDown={
					(event) => {
						if (this.isInExistedRegion(event)) {
							return
						}

						event.preventDefault()

						const pos = this.getClientPosInImage(event, this.refs.image)
						this.props.createRegion(pos.x, pos.y, this.props.regions.length)
					}
				}
				onMouseUp={
					(event) => this.props.setRegionStateUnchangedDispatch()
				}
				onMouseMove={
					(event) => {
						event.preventDefault()
						const clientPos = this.getClientPosInImage(event, this.refs.image)

						if (this.props.target.state === REGION_STATE_RESIZE) {
							this.props.resizeRegionDispatch(
								this.props.target.index,
								event.target.dataset.dir,
								this.props.target.oppositeCornerX,
								this.props.target.oppositeCornerY,
								clientPos.x,
								clientPos.y,
							)
						} else if (this.props.target.state === REGION_STATE_MOVE) {
							this.props.moveRegionDispatch(
								this.props.target.index,
								this.props.target.oldX,
								this.props.target.oldY,
								this.props.target.clientPosX,
								this.props.target.clientPosY,
								clientPos.x,
								clientPos.y,
							)
						}
					}
				}
				>
				{this.props.children}
				{this.props.regions.map(
					(region, index) => <ConnectedAlienRegion 
						x={region.x}
						y={region.y}
						width={region.width}
						height={region.height}
						index={index}
						key={index}
						// TODO: Send the size for the image only rather than the whole image.
						getClientPosInImage={
							(event) => this.getClientPosInImage(event, this.refs.image)
						}
						target={this.props.target}
						 >
					</ConnectedAlienRegion>)}
			</div>
		)
	}

// 	return ( 
// 		<div
// 			ref='image'
// // 			style={style.RegionSelect}
// 			style={Object.assign(
// 				{}, 
// 				style.RegionSelect, 
// 			)}
// // 			className={props.className}
// // 				onTouchStart={this.onComponentMouseTouchDown}
// // 				onMouseDown={this.onComponentMouseTouchDown}>
// 			>
// 			{props.regions.map(function(region) {
// 				return <AlienRegion region></AlienRegion>
// 			})}
// 			{props.children}
// 		</div>
// 	)

}

AlienRegionSelect.propTypes = {}


// class RegionSelect extends Component {
// 	constructor (props) {
// 		console.logs('>>> Props:' + props)
// 		super(props);
// 		this.onComponentMouseTouchDown = this.onComponentMouseTouchDown.bind(this);
// 		this.onDocMouseTouchMove = this.onDocMouseTouchMove.bind(this);
// 		this.stopChangeRegion = this.stopChangeRegion.bind(this);
// 		this.onRegionMoveStart = this.onRegionMoveStart.bind(this);
// 		this.regionCounter = 0;
// 	}
// 	componentDidMount() {
// 		document.addEventListener('mousemove', this.onDocMouseTouchMove);
// 		document.addEventListener('touchmove', this.onDocMouseTouchMove);
// 
// 		document.addEventListener('mouseup', this.stopChangeRegion);
// 		document.addEventListener('touchend', this.stopChangeRegion);
// 		document.addEventListener('touchcancel', this.stopChangeRegion);
// 	}
// 	componentWillUnmount() {
// 		document.removeEventListener('mousemove', this.onDocMouseTouchMove);
// 		document.removeEventListener('touchmove', this.onDocMouseTouchMove);
// 
// 		document.removeEventListener('mouseup', this.stopChangeRegion);
// 		document.removeEventListener('touchend', this.stopChangeRegion);
// 		document.removeEventListener('touchcancel', this.stopChangeRegion);
// 	}
// 
// 	onComponentMouseTouchDown (event) {
// 		if (this.isInExistedRegion(event)) {
// 			return;
// 		}
// 		event.preventDefault();
// 		this.createRegion(event)
// 	}
// 
// 	isInExistedRegion(event) {
// 		return event.target.dataset.wrapper 
// 			|| event.target.dataset.dir 
// 			|| isSubElement(event.target, (el) => el.dataset && el.dataset.wrapper)
// 	}
// 
// 	createRegion(event) {
// 		const clientPos = this.getClientPos(event);
// 		const imageOffset = this.getElementOffset(this.refs.image);
// 		const xPct = ((clientPos.x - imageOffset.left) / this.refs.image.offsetWidth) * 100;
// 		const yPct = ((clientPos.y - imageOffset.top) / this.refs.image.offsetHeight) * 100;
// 		this.isChanging = true;
// 		const rect = {
// 			x: xPct,
// 			y: yPct,
// 			width: 0,
// 			height: 0,
// 			new: true,
// 			data: { index: this.regionCounter },
// 			isChanging: true
// 		};
// 		this.regionCounter += 1;
// 		this.regionChangeData = {
// 			imageOffsetLeft: imageOffset.left,
// 			imageOffsetTop: imageOffset.top,
// 			imageWidth: this.refs.image.offsetWidth,
// 			imageHeight: this.refs.image.offsetHeight,
// 			oppositeCorner: {
// 				x: clientPos.x,
// 				y: clientPos.y,
// 			},
// 			changeState: RegionChangeState.Resize,
// 		};
// 		this.props.onChange(this.props.regions.concat(rect));
// 		this.regionChangeIndex = this.props.regions.length;
// 		console.log(this.props)
// // 		this.props.createRegionDispatch(xPct, yPct)
// 	}
// 
// 	/**
// 	 * Returns the page x and y positions for event. 
// 	 * It supports both the desktop and touchable devices.
// 	 * 
// 	 * @param {*} e Event. 
// 	 * @return {type} - It returns the x and y position for client. 
// 	 */
// 	getClientPos(e) {
// 		let pageX, pageY;
// 
// 		if (e.touches) {
// 			pageX = e.touches[0].pageX;
// 			pageY = e.touches[0].pageY;
// 		} else {
// 			pageX = e.pageX;
// 			pageY = e.pageY;
// 		}
// 
// 		return {
// 			x: pageX,
// 			y: pageY
// 		};
// 	}
// 
// 	getElementOffset (el) {
// 		const rect = el.getBoundingClientRect();
// 		const docEl = document.documentElement;
// 
// 		const rectTop = rect.top + window.pageYOffset - docEl.clientTop;
// 		const rectLeft = rect.left + window.pageXOffset - docEl.clientLeft;
// 
// 		return {
// 			top: rectTop,
// 			left: rectLeft
// 		};
// 	}
// 
// 	stopChangeRegion () {
// 		if (this.isChanging) {
// 			this.isChanging = false;
// 			const index = this.regionChangeIndex;
// 			const updatingRegion = this.props.regions[index];
// 			const changes = {
// 				new: false,
// 				isChanging: false
// 			};
// 			this.regionChangeIndex = null;
// 			this.regionChangeData = null;
// 			this.props.onChange([
// 				...this.props.regions.slice(0, index),
// 				objectAssign({}, updatingRegion, changes),
// 				...this.props.regions.slice(index + 1)
// 			]);
// 		}
// 	}
// 
// 	onRegionMoveStart (event, index) {
// 		console.log('>>> Move Index:' + index)
// 		if (!this.isInExistedRegion(event)) {
// 			return;
// 		}
// 
// 		event.preventDefault();
// 
// 		const clientPos = this.getClientPos(event);
// 		const imageOffset = this.getElementOffset(this.refs.image);
// 
// 		// Note that the x, y, width, height of currentRegion are all percentage.
// 		const currentRegion = this.props.regions[index];
// 		const regionLeft = ((currentRegion.x / 100) * this.refs.image.offsetWidth) + imageOffset.left;
// 		const regionTop = ((currentRegion.y / 100) * this.refs.image.offsetHeight) + imageOffset.top;
// 		const regionWidth = ((currentRegion.width / 100) * this.refs.image.offsetWidth);
// 		const regionHeight = ((currentRegion.height / 100) * this.refs.image.offsetHeight);
// 
// 		const clientPosXOffset = regionLeft - clientPos.x;
// 		const clientPosYOffset = regionTop - clientPos.y;
// 
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
// 
// 		this.isChanging = true;
// 		this.regionChangeIndex = index;
// 		this.regionChangeData = regionChangeData
// 	}
// 
// 	getOppositeCorner(
// 		resizeDir,
// 		regionLeft,
// 		regionTop,
// 		regionWidth,
// 		regionHeight) {
// 		switch (resizeDir) {
// 		    case 'se':
// 				return {
// 					x: regionLeft,
// 					y: regionTop,
// 				}
//             case 'sw':
// 				return {
// 					x: regionLeft + regionWidth,
// 					y: regionTop,
// 				}
//             case 'nw':
// 				return {
// 					x: regionLeft + regionWidth,
// 					y: regionTop + regionHeight,
// 				}
//             case 'ne':
// 				return {
// 					x: regionLeft,
// 					y: regionTop + regionHeight,
// 				}
//             default:
// 				return {
// 					x: regionLeft,
// 					y: regionTop,
// 				}
// 		}
// 	}
// 
// 	onDocMouseTouchMove (event) {
// 		if (!this.isChanging) {
// 			return;
// 		}
// 		const index = this.regionChangeIndex;
// 		const updatingRegion = this.props.regions[index];
// 		const clientPos = this.getClientPos(event);
// 		const regionChangeData = this.regionChangeData;
// 
// 		let region;
// 		switch (regionChangeData.changeState) {
// 			case RegionChangeState.Resize:
// 				region = this.updateRegionResize(
// 					clientPos,
// 					regionChangeData
// 				)
// 				break;
//             case RegionChangeState.Move:
// 				region = this.updateRegionMove(
// 					clientPos,
// 					regionChangeData,
// 					updatingRegion
// 				)
// 				break;
//             default:
// 				console.log('Invalid state:' + regionChangeData)
// 				return;
// 		}
// 
// 		const rect = Object.assign(
// 			{}, 
// 			region, 
// 			{isChanging: true}
// 		)
// 		this.props.onChange([
// 			...this.props.regions.slice(0, index),
// 			objectAssign({}, updatingRegion, rect),
// 			...this.props.regions.slice(index + 1)
// 		]);
// 	}
// 
// 	updateRegionResize(
// 		clientPos, 
// 		regionChangeData) {
// 		let oppositeCornerX = ((regionChangeData.oppositeCorner.x - regionChangeData.imageOffsetLeft) / regionChangeData.imageWidth) * 100;
// 		let oppositeCornerY = ((regionChangeData.oppositeCorner.y - regionChangeData.imageOffsetTop) / regionChangeData.imageHeight) * 100;
// 		let newCornerX = ((clientPos.x - regionChangeData.imageOffsetLeft) / regionChangeData.imageWidth) * 100;
// 		let newCornerY = ((clientPos.y - regionChangeData.imageOffsetTop) / regionChangeData.imageHeight) * 100;
// 		let x = Math.min(oppositeCornerX, newCornerX);
// 		let y = Math.min(oppositeCornerY, newCornerY);
// 		let width = Math.abs(oppositeCornerX - newCornerX);
// 		let height = Math.abs(oppositeCornerY - newCornerY);
// 
// 		// Deal with the case with constraint
// 		if(this.props.constraint){
// 			if (newCornerX >= 100) { 
// 				x = oppositeCornerX; 
// 				width = 100 - oppositeCornerX; 
// 			}
// 			
// 			if (newCornerY >= 100) { 
// 				y = oppositeCornerY; 
// 				height = 100 - oppositeCornerY; 
// 			}
// 
// 			if (newCornerX <= 0) { 
// 				x = 0; 
// 				width = oppositeCornerX; 
// 			}
// 			
// 			if (newCornerY <= 0) { 
// 				y = 0; 
// 				height = oppositeCornerY; 
// 			}
// 		}
// 		return {
// 			x: x,
// 			y: y,
// 			width: width,
// 			height: height,
// 		}
// 	}
// 
// 	updateRegionMove(
// 		clientPos, 
// 		regionChangeData, 
// 		updatingRegion) {
// 		let x = (((clientPos.x + regionChangeData.clientPosXOffset) - regionChangeData.imageOffsetLeft) / regionChangeData.imageWidth) * 100;
// 		let y = (((clientPos.y + regionChangeData.clientPosYOffset) - regionChangeData.imageOffsetTop) / regionChangeData.imageHeight) * 100;
// 		let width = updatingRegion.width;
// 		let height = updatingRegion.height;
// 
// 		// Deal with the case with constraint
// 		if(this.props.constraint){
// 			if (x + width >= 100) { 
// 				x = Math.round(100 - width); 
// 			}
// 			
// 			if (y + height >= 100) { 
// 				y = Math.round(100 - height); 
// 			}
// 			
// 			if (x <= 0) { 
// 				x = 0; 
// 			}
// 			
// 			if (y <= 0) { 
// 				y = 0; 
// 			}
// 		}
// 		return {
// 			x: x,
// 			y: y,
// 			width: width,
// 			height: height,
// 		}
// 	}
// 
// 	renderRect (rect, index) {
// 		return <Region
// 			x={rect.x}
// 			y={rect.y}
// 			width={rect.width}
// 			height={rect.height}
// 			handles={!rect.new}
// 			data={rect.data}
// 			key={index}
// 			index={index}
// 			customStyle={this.props.regionStyle}
// 			dataRenderer={this.props.regionRenderer}
// 			onCropStart={(event) => this.onRegionMoveStart(event, index)}
// 			changing={index === this.regionChangeIndex}
// 		/>;
// 	}
// 
// 	render () {
// 		const regions = this.props.regions;
// 		return (
// 			<div
// 				ref='image'
// 				style={Object.assign(
// 					{}, 
// 					style.RegionSelect, 
// 					this.props.style
// 				)}
// 				className={this.props.className}
// 				onTouchStart={this.onComponentMouseTouchDown}
// 				onMouseDown={this.onComponentMouseTouchDown}>
// 				{regions.map(this.renderRect.bind(this))}
// 				{this.props.debug
// 					? <table style={{position:'absolute', right: 0, top: 0}}>
// 							<tbody>
// 								{regions.map((rect, index) => {
// 									return (
// 										<tr key={index}>
// 											<td>x: {Math.round(rect.x, 1)}</td>
// 											<td>y: {Math.round(rect.y, 1)}</td>
// 											<td>width: {Math.round(rect.width, 1)}</td>
// 											<td>height: {Math.round(rect.height, 1)}</td>
// 										</tr>
// 									);
// 								})}
// 							</tbody>
// 						</table>
// 					: null }
// 				{this.props.children}
// 			</div>
// 		);
// 	}
// }
// 
// RegionSelect.propTypes = {
// 	constraint: PropTypes.bool,
// 	regions: PropTypes.array,
// 	children: PropTypes.any,
// 	onChange: PropTypes.func.isRequired,
// 	regionRenderer: PropTypes.func,
// 	maxRegions: PropTypes.number,
// 	debug: PropTypes.bool,
// 	className: PropTypes.string,
// 	style: PropTypes.object,
// 	regionStyle: PropTypes.object,
// 	isChanging: PropTypes.bool,
// 	createRegionDispatch: PropTypes.func,
// };
// 
// RegionSelect.defaultProps = {
// 	maxRegions: Infinity,
// 	debug: false,
// 	regions: [],
// 	constraint: false
// };
// 
// function isSubElement (el, check) {
// 	if (el === null) {
// 		return false;
// 	} else if (check(el)) {
// 		return true;
// 	} else {
// 		return isSubElement(el.parentNode, check);
// 	}
// }

export default AlienRegionSelect
