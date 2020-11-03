
/*
Update dynamic graphs and tables
*/

function loadPage(idx){
	d3.json("samples.json").then (data =>{
			
		// Load ID into select
		let id = data.names;
		id.forEach((ID) => {
			var sel = d3.select("select");
			var cell = sel.append("option");	
			cell.text(ID);
		});

		// Get demographic data
		let meta_id = "id: " + data.metadata[idx].id;
		let ethnicity = "ethnicity: " + data.metadata[idx].ethnicity;
		let gender = "gender: " + data.metadata[idx].gender;
		let age = "age: " + data.metadata[idx].age;
		let location = "location: " + data.metadata[idx].location;
		let bbtype = "bbtype: " + data.metadata[idx].bbtype;
		let wfreq = "wfreq: " + data.metadata[idx].wfreq;
		
		// Get chart data
		let sample_values = data.samples[idx].sample_values.slice(0,10);
		let otu_ids = data.samples[idx].otu_ids.slice(0,10);	
		let otu_labels = data.samples[idx].otu_labels.slice(0,10);	
		let otu_ids_yaxis = otu_ids.map(row => "OTU " + row);
		let wfreq_data = data.metadata[idx].wfreq;
			
		// Load demographic info
		loadDemo(meta_id, ethnicity, gender, age, location, bbtype, wfreq); 
		function loadDemo(meta_id, ethnicity, gender, age, location, bbtype, wfreq){
			for (var i = 0; i < arguments.length; i++){
				var demo = d3.select("#sample-metadata");
				var cell = demo.append("h6");	
				cell.text(arguments[i]);
			};
		};
		
 
		/* 
		Load and display bar graph
		*/
							
		// Create your bar chart trace.
		let trace1 = {
			x: sample_values,
			y: otu_ids_yaxis,
			hovertext: otu_labels,
			orientation: 'h',
			type: "bar"
		};

		// Create the data array for our bar chart plot
		let data1 = [trace1];
		
		// Define the bar plot layout
		let layout1 = {
			yaxis: {autorange: 'reversed'}
		};
				
		// Plot the bar chart to a div tag with id "bar"
		Plotly.newPlot("bar", data1, layout1);	 
	
		
		/* 
		Load and display bubble chart
		*/
		
		// Create your bar chart trace.
		let trace2 = {
			x: otu_ids,
			y: sample_values,
			text: otu_labels,
			mode: 'markers',
			marker: {
				size: sample_values,
				color: otu_ids				
			}
		};
		
		// Create the data array for our bubble chart plot
		var data2 = [trace2];
		
		// Define the bar bubble plot layout
		var layout2 = {
			showlegend: false,
		};

		// Plot the bubble chart to a div tag with id "bubble"
		Plotly.newPlot('bubble', data2, layout2);
		
		
		/* 
		Load and display guage chart
		*/
		
		// Create the data array for our gauge chart plot
		var trace3 = [
			{
				domain: { x: wfreq_data, y: [0, 1] },
				value: wfreq_data,
				title: { text: "Belly Button Washing Frequency<br> Scrubs Per Week" },
				type: "indicator",
				mode: "gauge+number",
				gauge: {
					axis: { range: [null, 9] },
					steps: [
						{ range: [0, 1], color: "#C0C0C0" },
						{ range: [1, 2], color: "#BEBEBE" },
						{ range: [2, 3], color: "#B8B8B8" },
						{ range: [3, 4], color: "#B0B0B0" },
						{ range: [4, 5], color: "#A9A9A9" },
						{ range: [5, 6], color: "#A8A8A8" },
						{ range: [6, 7], color: "#A0A0A0" },
						{ range: [7, 8], color: "#989898" },
						{ range: [8, 9], color: "#909090" },
					]
				}
				
			}
		];
		
		// Create the data array for our bubble chart plot
		//var data3 = [trace3];

		// Define the gauge plot layout
		var layout3 = { 
			width: 5, 
			height: 500, 
			margin: { t: 0, b: 0 } 
		};
		
		// Plot the guage chart to a div tag with id "guage"
		Plotly.newPlot('gauge', trace3, layout3);
					
			});
};


/* 
Get the currently selected ID, find it's index in list of all IDs
used the index to retrieve all data associated with current ID
Update screen data.
*/
function optionChanged(sel){
		
		// Get list of IDs and retrieve index of currently selected ID
		d3.json("samples.json").then (data =>{
			let id = data.names;
			
			// Get currenly selected ID
			var dropDownMenu = d3.select("#selDataset");
			var dataset = dropDownMenu.node().value;
			
			// Does the currently selected ID equal to "this" ID	
			function inID(id){
				return id == dataset;
			};	
			
			// Loop through list of IDs and index of current ID
			function checkID(){
				return id.findIndex(inID);
			};
			
			// Index for selected ID used to reload page with corresponding data
			var idx = checkID();
			
			// Clear table data
			var elements = document.getElementsByTagName('h6');
			while (elements[0]) elements[0].parentNode.removeChild(elements[0]);
	 
			
			// Reload page with new data
			loadPage(idx);
			
		});
};
	

// Load page
var idx = "0"
loadPage(idx);
	


 
