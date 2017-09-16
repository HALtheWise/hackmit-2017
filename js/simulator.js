/*
start is an array of arrays of [stone height, snow height, water height]
returns an array of arrays of [stone height, snow height, water height]
*/
function simulate_step(state){
	dt = 0.5;

	// Add snow
	snowfallFunc = function(initial) {
		altitude = initial[0];
		snow = initial[1];
		if (altitude > snow_altitude){
			snow += snow_rate * dt;
		}
		// BEWARE: this may alter the original object in a bad way. Oops.
		initial[1] = snow;
		return initial;
	}

	state = state.map(function(row){return row.map(snowfallFunc)})

	// Melt snow
	meltingFunc = function(initial){
		altitude = initial[0];
		snow = initial[1];
		water = initial[2];

		melt = melt_rate * dt;
		melt = Math.min(melt, snow);

		snow -= melt;
		water += melt * water_per_snow;

		// BEWARE: this may alter the original object in a bad way. Oops.
		initial[1] = snow;
		initial[2] = water;
		return initial;
	}

	state = state.map(function(row){return row.map(meltingFunc)})

	return state;
}

function get_sample_state(){
	return [
		[[15.0,0.0,0.0],[10.0,0.0,0.0],[5.0,0.0,0.0]],
		[[15.0,0.0,0.0],[10.0,0.0,0.0],[5.0,0.0,0.0]],
		[[15.0,0.0,0.0],[10.0,0.0,0.0],[5.0,0.0,0.0]]
		];
}
