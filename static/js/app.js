// Read JSON data from url
const URL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function setUp() {
    d3.json(URL).then((data) => {
        
        console.log("Here is the JSON data:")
        console.log(data);
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
    let barSpace = d3.select('')
    d3.json(URL).then((data) => {
        let subjectOtuId = data.samples.filter(obj => obj.id == subjectId)[0];
          
    })
    
      
}
//     let choice = d3.select('select').node().value;

//     d3.json('./static/data/samples.json').then(({metadata,samples}) =>{
//         let meta = metadata.filter(onj => obj.id == choice)[0];
//         let sample = samples.filter(obj => obj.id == choice)[0];

//         d3.select('.panel-body').html('');
//         Object.entries(meta).forEach(([key,val]) => {
//         console.log(sample);

//         let {otu_ids,otu_labels,sample_values} = sample;
        
//         var data =[
//             {
//                 x: sample_values.slice(0,10).reverse(),
//                 y: otu_ids.slice(0,10).reverse().map(z =>`OTU ${x}`),
//                 text: otu_labels.slice(0,10).reverse(),
//                 type:'bar',
//                 orientation: 'h'
//             }
//         ];

//         Plotly.newPlot('bar',data);

//     })
// }
setUp();
