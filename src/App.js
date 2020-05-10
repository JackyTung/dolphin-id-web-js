import React, { Component } from 'react';
import RegionSelect from 'react-region-select';
import dolphinImage from './dolphin.jpg'

// require('./style.css');

const DEFAULT_COLOR = 'rgba(0, 0, 0, 0.5)'
const RED = 'rgba(255, 0, 0, 0.5)';
const GREEN = 'rgba(0, 255, 0, 0.5)';
const BLUE = 'rgba(0, 0, 255, 0.5)'; 

const BOX_RED = 'red'
const BOX_BLUE = 'blue'
const BOX_GREEN = 'green'

class App extends Component {
	constructor (props) {
		super(props);
		this.regionRenderer = this.regionRenderer.bind(this);
		this.onChange = this.onChange.bind(this);
		this.state = {
			regions: []
		};
	}

	render() {
		const regionStyle = {
			background: DEFAULT_COLOR
		};

		return (
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div style={{ flexGrow: 1, flexShrink: 1, width: '50%' }}>
					<RegionSelect
						maxRegions={30}
						regions={this.state.regions}
            			regionStyle={regionStyle}
						constraint
						onChange={this.onChange}
						regionRenderer={this.regionRenderer}
						style={{ border: '1px solid black' }}
					>
						<img src={dolphinImage} width='100%' alt='dolphin'/>
					</RegionSelect>
				</div>
				<div style={{ flexGrow: 1, flexShrink: 1, width: '50%', padding: 15 }}>
					Select something with your mouse on the left side
				</div>
				<div style={{ bottom: 0 }}>
					<table id='test table'>
						<tbody>
							{this.renderTableHeader()}
							{this.renderTableData(this.state.regions)}
						</tbody>
					</table>
				</div>
			</div>
		);
	}

	onChange (regions) {
		this.setState({
			regions: regions
		});
	}

	regionRenderer (regionProps) {
		console.log(regionProps)
		if (!regionProps.isChanging) {
			return (
				<div style={{ position: 'absolute', right: 0, bottom: '-1.5em' }}>
					<select onChange={(event) => this.changeRegionData(regionProps.index, event)} value={regionProps.data.dataType}>
						<option value={BOX_RED}>Red</option>
						<option value={BOX_GREEN}>Green</option>
						<option value={BOX_BLUE}>Blue</option>
					</select>
				</div>
			);
		}
	}

	changeRegionData (index, event) {
		const region = this.state.regions[index];
		let color = RED;
		switch (event.target.value) {
		case BOX_RED:
			color = RED;
			break;
		case BOX_GREEN:
			color = GREEN;
			break;
		case BOX_BLUE:
			color = BLUE;
			break;
		default:
			color = DEFAULT_COLOR;
		}

		region.data.regionStyle = {
			background: color
		};
		// Reassign the region changed back to regions.
		this.onChange([
			...this.state.regions.slice(0, index),
			Object.assign({}, region, {
				data: Object.assign({}, region.data, { dataType: event.target.value })
			}),
			...this.state.regions.slice(index + 1)
		]);
	}

	renderTableHeader() {
			return (
				<tr>
					<td>INDEX</td>
					<td>Left Upper Corner - X</td>
					<td>Left Upper Corner - Y</td>
					<td>Width</td>
					<td>Height</td>
					<td>COLOR</td>
				</tr>
			)
	}

	renderTableData(regions) {
		if (regions.length > 0) {
			return regions.map((region, index) => {
				console.log(region, index)
				let color = RED
				if ('regionStyle' in region.data) {
					color = region.data.regionStyle.background
				}
			   	return (
				  	<tr key={index}>
					 	<td>{index}</td>
						<td>{region.x.toFixed(2)}</td>
					    <td>{region.y.toFixed(2)}</td>
					    <td>{region.width.toFixed(2)}</td>
					    <td>{region.height.toFixed(2)}</td>
					 	<td>{color}</td>
				  	</tr>
			   	)
			})
		} else {
			console.log('This is a test')
			return
		}
	}

}

export default App

// module.exports = App;

// import React from 'react';
// // import logo from './logo.svg';
// import dolphinImg from './dolphin.jpg'
// import Region from './Region'
// import './App.css';
// 
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={dolphinImg} className="App-logo" alt="logo" />
//         <Region />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
// 
// export default App;
// 