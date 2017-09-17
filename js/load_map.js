var loadedMap;

function loadMap(url){
	jQuery.ajaxSetup({async:false});
	$.get(url, null, loadCSV);
}

function loadCSV(data){
	arrays = $.csv.toArrays(data);

	loadedMap = arrays.map(
		function(row){return row.map(
			function(val){return [parseFloat(val), 0.0, 0.0]})});

	grid_height = loadedMap.length;
	grid_width = loadedMap[0].length;

	// display(loadedMap);
}

var neatFile = 'heightmaps/neat.csv';