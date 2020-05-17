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
        <td>
            <input type='date' name='trip_date' min='2000-01-01' max='2099-01-01'></input>
        </td>
        <td>
            <input 
                type='number' 
                name='trip_number'  
                value={props.region.data.tripNum} 
                onChange={props.setTripNumber}
            ></input>
        </td>
        <td>
            <input 
                type='number' 
                name='trip_id' 
            ></input>
        </td>
        <td>
            <input type='number' name='ku_id'></input>   
        </td>
	</tr>
}

RegionRow.propTypes = {
	region: PropTypes.shape({
		index: PropTypes.number,
		x: PropTypes.number,
		y: PropTypes.number,
		width: PropTypes.number,
		height: PropTypes.number,
        data: PropTypes.object,
        setTripNumber: PropTypes.func
	})
}


export default RegionRow