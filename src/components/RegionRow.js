import PropTypes from 'prop-types'
import React from 'react';
import * as c from '../const'

function RegionRow(props) {
    let colorStyle = {
        background: c.COLOR_DEFAULT,
    }

    if (props.target 
        && props.target.index >= 0
        && props.target.index === props.region.index) {
        colorStyle.background = c.COLOR_SELECTED
    }

	return (
        <tr 
            key={props.region.index} 
            style={colorStyle}
            >
    		<td>{props.region.index}</td>
    		<td>{props.region.x.toFixed(2)}</td>
    		<td>{props.region.y.toFixed(2)}</td>
    		<td>{props.region.width.toFixed(2)}</td>
    		<td>{props.region.height.toFixed(2)}</td>
            <td>
                <input 
                    type='date' 
                    name='trip_date' 
                    min='2000-01-01' 
                    max='2099-12-31'
                    value={props.region.data.tripDate}
                    onChange={props.setTripDate}
                ></input>
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
                    value={props.region.data.tripId}
                    onChange={props.setTripID}
                ></input>
            </td>
            <td>
                <input 
                    type='number' 
                    name='ku_id'
                    value={props.region.data.kuId}
                    onChange={props.setKUID}
                ></input>   
            </td>
            <td>
                <button 
                    name='delete_button'
                    onClick={props.deleteRegion}
                >
                Delete
                </button>
            </td>
    	</tr>
    )
}

RegionRow.propTypes = {
	region: PropTypes.shape({
		index: PropTypes.number,
		x: PropTypes.number,
		y: PropTypes.number,
		width: PropTypes.number,
		height: PropTypes.number,
        data: PropTypes.object,
        setTripNumber: PropTypes.func,
        setTripID: PropTypes.func,
        setKUID: PropTypes.func,
        deleteRegion: PropTypes.func,
	})
}


export default RegionRow