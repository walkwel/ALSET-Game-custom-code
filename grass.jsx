import React, {Component} from 'react';
import { TileMap } from 'react-game-kit';
import grass from './assets/grass.jpg'

export default class Grass extends Component {
	constructor(props) {
		super(props);
	}
	
	getWrapperStyles() {
		return {
			position: 'absolute',
			transform: 'translate(0px, 0px) translateZ(0)',
			transformOrigin: 'top left',
		};
	}
	
	render() {
		
    return (
		<div style={this.getWrapperStyles()}>
			<TileMap
			  style={{ top: 0, left:0 }}
			  src={grass}
			  rows={5}
			  columns={8}
			  tileSize={128}
			  layers={[[1]]}
			/>
		</div>
    );
  }
}
