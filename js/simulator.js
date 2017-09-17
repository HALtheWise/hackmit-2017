/*
start is an array of arrays of [stone height, water height, snow height]
returns an array of arrays of [stone height, water height, snow height]
*/
function simulate_step(state){
	dt = 0.5;

	// Add snow
	snowfallFunc = function(initial) {
		altitude = initial[0];
		snow = initial[2];
		if (altitude > snow_altitude){
			snow += snow_rate * dt;
		}
		// BEWARE: this may alter the original object in a bad way. Oops.
		initial[2] = snow;
		return initial;
	}

	state = state.map(function(row){return row.map(snowfallFunc)})

	// Melt snow
	meltingFunc = function(initial){
		altitude = initial[0];
		snow = initial[2];
		water = initial[1];

		melt = melt_rate * dt;
		melt = Math.min(melt, snow);

		snow -= melt;
		water += melt * water_per_snow;

		// BEWARE: this may alter the original object in a bad way. Oops.
		initial[2] = snow;
		initial[1] = water;
		return initial;
	}

	// Flow the water

	// Makes a grid_height x grid_width x 2 array of 0's
	// [flow_in, flow_out]
	var flows=new Array(grid_height).fill(0).map(function(hi){return new Array(grid_width).fill(0).map(function(hi){return [0,0]})});

	for(var i=0; i<grid_height; i++){
		for (var j=0; j<grid_width; j++){
			// Calculate heights
			var ownHeight = state[i][j][0] + state[i][j][1];
			
			var northHeight = 99999999999999;
			var southHeight = 99999999999999;
			var westHeight  = 99999999999999;
			var eastHeight  = 99999999999999;

			if (i > 0) {
				northHeight = state[i-1][j][0] + state[i-1][j][1];
			}
			if (i < grid_height-1) {
				southHeight = state[i+1][j][0] + state[i+1][j][1];
			}
			if (j > 0) {
				westHeight = state[i][j-1][0] + state[i][j-1][1];
			}
			if (j < grid_width-1) {
				eastHeight = state[i][j+1][0] + state[i][j+1][1];
			}

			smallest=Math.min(northHeight, southHeight, westHeight, eastHeight);

			if (ownHeight <= smallest){
				continue;
			}

			// Calculate flow
			flowAmount = flow_rate_const*(ownHeight-smallest)*dt;
			flowAmount = Math.min(flowAmount, state[i][j][1]);

			flows[i][j][1] = flowAmount;

			// Apply flow
			if (northHeight==smallest){
				flows[i-1][j][0] += flowAmount;
				continue;
			}
			if (southHeight==smallest){
				flows[i+1][j][0] += flowAmount;
				continue;
			}
			if (westHeight==smallest){
				flows[i][j-1][0] += flowAmount;
				continue;
			}
			if (eastHeight==smallest){
				flows[i][j+1][0] += flowAmount;
				continue;
			}
		}
	}

	// Apply flows to values

	for(var i=0; i<grid_height; i++){
		for (var j=0; j<grid_width; j++){
			if(state[i][j][0]<ocean_altitude){
				// Remove the land, it's OCEAN time!
				state[i][j][0] = 0.0;
				state[i][j][1]=ocean_altitude-state[i][j][0];
			}else{
				state[i][j][1] = state[i][j][1] + flows[i][j][0] - flows[i][j][1];
				var stone_eroded = Math.pow(flows[i][j][1]/dt, 2)*erosion_rate_const*dt;
				state[i][j][0] -= stone_eroded;
			}
		}
	}
	

	state = state.map(function(row){return row.map(meltingFunc)})

	return state;
}

function get_sample_state(){
	return [
		[[10.0,10.0,1.0],[10.0,0.0,0.0],[5.0,0.0,0.0]],
		[[15.0,0.0,0.0],[10.0,0.0,0.0],[5.0,0.0,0.0]],
		[[15.0,0.0,0.0],[10.0,0.0,0.0],[5.0,0.0,0.0]]
		];
}
