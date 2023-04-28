// Read JSON data from url
const URL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function setUp() {
    // solamente la lista dropdown de los posibles children junto con la primer 
    // grafica e informacion!!!!
    d3.json(URL).then((data) => {
        // console.log("Here is the JSON data:")
        // console.log(data);
        let names = data.names;

        names.forEach(id =>  {
            d3.select('select').append('option').attr("value" , id).text(id);
        });

        optionChanged(names[0]);
    });
}
function optionChanged(subjectId) {
    console.log(subjectId);
    demoBox(subjectId);
    allGraphs(subjectId)
}

function demoBox(subjectId) {
    console.log(`hey! we're doing demobox for ${subjectId}`);
    let panel =  d3.select('.panel-body');
    d3.json(URL).then((data) => {
       panel.html('');
       let subjectMeta = data.metadata.filter(obj => obj.id == subjectId)[0];
       gaugeGraph(subjectMeta.wfreq);
        Object.entries(subjectMeta).forEach(([key, val]) => {
            panel.append('h6').text(`${key.toUpperCase()}: ${val}`)
        });
    });
}   
function gaugeGraph(wfreq){
    let gaugeData = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: wfreq,
            title: { text: "Weekly Scrubs" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [null, 10] },
                steps: [
                  { range: [0, 1], color: "#ebfaeb" },
                  { range: [1, 2], color: "#c2f0c2" },
                  { range: [2, 3], color: "#99e699" },
                  { range: [3, 4], color: "#70db70" },
                  { range: [4, 5], color: "#47d147" },
                  { range: [5, 6], color: "#33cc33" },
                  { range: [6, 7], color: "#2eb82e" },
                  { range: [7, 8], color: "#29a329" },
                  { range: [8, 9], color: "#248f24" },
                  { range: [9, 10], color: "#145214" }
                ],
            }
        }
    ];
    // 2. Create the layout for the bubble chart.
    var gaugeLayout = { width: 600, height: 500, margin: { t: 0, b: 0 } };

     // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);
}


function allGraphs(subjectId) {
    console.log(`we're using ${subjectId} info to make graphs!`)
    // let barSpace = d3.select('');
    d3.json(URL).then((data) => {
        // figure out how to grab data here!!!!!!
        let samples = data.samples;
        let resultArray = samples.filter((sampleObj) => sampleObj.id == subjectId);
        let result = resultArray[0];

        let otu_ids = result.otu_ids;
        console.log(`aqui estan ${otu_ids}`);
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        let yticks = otu_ids
            .slice(0,10)
            .map(otuID => `OTU ${otuID}`)
            .reverse();
        // 1. Create the trace for the bar chart.

        let barData =[
            {
                y: yticks,
                x: sample_values.slice(0,10).reverse(),
                hovertext: otu_labels.slice(0,10).reverse(),
                type: "bar",
                marker:{color:"#29a329"},
                orientation: "h",
            },
        ];
         // 2. Create the layout for the bar chart.

        let barLayout = {
            title: "Top 10 Bacteria Cultures Found ",
            margin: { t: 30, l: 150 },
        };
        // 3. Use Plotly to plot the data with the layout.

        Plotly.newPlot("bar" , barData , barLayout);

        // 1. Create the trace for the bubble chart.

        let bubbleTrace = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            text: otu_labels,
            marker: {
                color: otu_ids,
                size: sample_values,
                colorscale: 'Earth'
              }
        };
        let bubbleData = [bubbleTrace];
         // 2. Create the layout for the bubble chart.
          
        let bubbleLayout = {
            title: 'Bacteria Cultures per Sample',
            margin: {t: 0},
            hovermode: "closest",
            xaxis: { title: "OTU ID"},
            margin: { t: 30},
            height: 600,
            width: 1500
          };
           // 3. Use Plotly to plot the data with the layout.
        
          Plotly.newPlot("bubble", bubbleData, bubbleLayout);

        
        

        
          
        });
    };
setUp();

