import PropTypes from 'prop-types'
import React from 'react';

const BOX_DEFAULT_COLOR = 'none'


function RegionRow(props) {
	let color = BOX_DEFAULT_COLOR
	if ('dataType' in props.region.data) {
		color = props.region.data.dataType
	}
	return <tr key={props.region.data.index}>
		<td>{props.region.data.index}</td>
		<td>{props.region.x.toFixed(2)}</td>
		<td>{props.region.y.toFixed(2)}</td>
		<td>{props.region.width.toFixed(2)}</td>
		<td>{props.region.height.toFixed(2)}</td>
		<td>{color}</td>
	</tr>
}

RegionRow.propTypes = {
	region: PropTypes.shape({
		index: PropTypes.number,
		x: PropTypes.number,
		y: PropTypes.number,
		width: PropTypes.number,
		height: PropTypes.number,
		data: PropTypes.object
	})
}

export default RegionRow