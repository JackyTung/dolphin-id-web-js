import React, { Component } from 'react';
import RegionSelect from 'react-region-select';
import dolphinImage from '../dolphin.jpg'
import RegionTable from './RegionTable'

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
					{console.log(this.state)}
					<RegionTable regions={'regions' in this.state? this.state.regions : []} />
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
}

export default App