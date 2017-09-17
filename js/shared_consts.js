grid_width = 3;
grid_height = 3;

snow_altitude = 11.0; // Units
default_ocean_altitude = 2.5; // Units

default_snow_rate = .6; // Units per time
melt_rate = 0.3; // Units of snow per time

minimum_melt_temp = .3; // Range from 0 to 1
maximum_snow_temp = .5; // Range from 0 to 1

water_per_snow = 0.25; // Units of water height equal to one unit of snow height

flow_rate_const = 2; // Units of (water height per time) per (water height difference)
erosion_rate_const = .005; // Units of (stone per time) eroded per (water per time)^2

max_border_water = 0.25; // Units of water height

year_length = 50;