import React from 'react';

function RegionHeader() {
	const headers = [
		'Index',
		'Upper Left X',
		'Upper Left Y',
		'Width',
		'Height',
		'Color',
		'Trip Date',
		'Trip Number',
		'Trip ID',
		'Ku ID'
	]
	return <thead>
		<tr>
			{headers.map(
				(msg, index) => <th key={index}>{msg}</th>
			)}
		</tr>
	</thead>
}

export default RegionHeader