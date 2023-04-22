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
        Object.entries(subjectMeta).forEach(([key, val]) => {
            panel.append('h6').text(`${key.toUpperCase()}: ${val}`)
        });
    });
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
        let barData =[
            {
                y: yticks,
                x: sample_values.slice(0,10).reverse(),
                text: otu_labels.slice(0,10).reverse(),
                type: "bar",
                orientation: "h",
            },
        ];

        let barLayout = {
            title: "Top 10 Bacteria Cultures Found ",
            margin: { t: 30, l: 150 },
        };
        Plotly.newPlot("bar" , barData , barLayout);

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
          
        let bubbleLayout = {
            title: 'Bacteria Cultures',
            showlegend: true,
            height: 600,
            width: 1500
          };
          
          Plotly.newPlot("bubble", bubbleData, bubbleLayout);
          
        });
    };
setUp();

