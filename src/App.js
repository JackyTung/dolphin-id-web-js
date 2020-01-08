import React, { Component } from 'react';
import objectAssign from 'object-assign';
import RegionSelect from 'react-region-select';
import dolphinImage from './dolphin.jpg'

// require('./style.css');

class App extends Component {
	constructor (props) {
		super(props);
		this.regionRenderer = this.regionRenderer.bind(this);
		this.onChange = this.onChange.bind(this);
		this.state = {
			regions: []
		};
	}

	onChange (regions) {
		this.setState({
			regions: regions
		});
	}

	changeRegionData (index, event) {
		const region = this.state.regions[index];
		let color;
		switch (event.target.value) {
		case '1':
			color = 'rgba(0, 255, 0, 0.5)';
			break;
		case '2':
			color = 'rgba(0, 0, 255, 0.5)';
			break;
		case '3':
			color = 'rgba(255, 0, 0, 0.5)';
			break;
		default:
			color = 'rgba(0, 0, 0, 0.5)';
		}

		region.data.regionStyle = {
			background: color
		};
		this.onChange([
			...this.state.regions.slice(0, index),
			objectAssign({}, region, {
				data: objectAssign({}, region.data, { dataType: event.target.value })
			}),
			...this.state.regions.slice(index + 1)
		]);
	}

	regionRenderer (regionProps) {
		if (!regionProps.isChanging) {
			return (
				<div style={{ position: 'absolute', right: 0, bottom: '-1.5em' }}>
					<select onChange={(event) => this.changeRegionData(regionProps.index, event)} value={regionProps.data.dataType}>
						<option value='1'>Green</option>
						<option value='2'>Blue</option>
						<option value='3'>Red</option>
					</select>
				</div>
			);
		}
	}

	render() {
		const regionStyle = {
			background: 'rgba(255, 0, 0, 0.5)'
		};

		return (
			<div style={{ display: 'flex' }}>
				<div style={{ flexGrow: 1, flexShrink: 1, width: '50%' }}>
					<RegionSelect
						maxRegions={5}
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
			</div>
		);
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