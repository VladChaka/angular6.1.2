// require('zone.js');
let Zone = require('node-zone'),
    secondFunction = require('./testing');

Zone.current.fork('first').run(() => {
    secondFunction(Zone);
    console.log("process.nextTick",Zone.current.data);

    process.nextTick(() => {
        console.log("process.nextTick",Zone.current.name);
        console.log("process.nextTick",Zone.current.data);        
    });
});

// secondFunction();



// let firstZone = Zone.current.fork({
//     name: 'firstZone',
//     properties: { 
//         data: { 
//             value: "data"
//         }
//     }
// });

// firstZone.run(function () {
//     firstZone.get('data').value = {
//         value: 'data',
//         id: 1
//     };
// });
// Zone.current.myData = {name: 'Other'};

// Zone.current.fork({}).run(() => {
//     Zone.current.name = 'firstZone';
//     Zone.current.myData = {name: 'Maksim'};

//     firstFunction();
// });

// firstFunction();

// Zone.current.fork({}).run(() => {
//     Zone.current.name = 'firstZone';
    
//     setTimeout(() => {
//         Zone.current.myData = {name: 'Dima'};
//     }, 2000);
//     firstFunction();
// });

// Zone.current.fork({}).run(() => {
//     Zone.current.name = 'firstZone';
//     Zone.current.myData = {name: 'Vasya'};

//     firstFunction();
// });

// function firstFunction() {
//     setTimeout(secondFunction);
// }

// function secondFunction() {
//     console.log(Zone.current.myData);
// }