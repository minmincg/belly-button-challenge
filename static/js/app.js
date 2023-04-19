// Read data
// d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    
//     console.log("Here is the data:")
//     console.log(data);

// });

d3.json('./static/data/samples.json').then(({names}) => {

    names.forEach(id =>  {
        d3.select('select').append('option').text(id);
    });
    optionChanged();
});

const optionChanged = () => {
    let choice = d3.select('select').node().value;

    d3.json('./static/data/samples.json').then(({metadata,samples}) =>{
        let meta = metadata.filter(onj => obj.id == choice)[0];
        let sample = samples.filter(obj => obj.id == choice)[0];

        d3.select('.panel-body').html('');
        Object.entries(meta).forEach(([key,val]) => {
            d3.select('.panel-body').append('h6').text(`${key.toUpperCase()}:${val}`)
        });
        console.log(sample);

        let {otu_ids,otu_labels,sample_values} = sample;
        
        var data =[
            {
                x: sample_values.slice(0,10).reverse(),
                y: otu_ids.slice(0,10).reverse().map(z =>`OTU ${x}`),
                text: otu_labels.slice(0,10).reverse(),
                type:'bar',
                orientation: 'h'
            }
        ];

        Plotly.newPlot('bar',data);

    })
}