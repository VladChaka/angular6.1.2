require('zone.js');
let express = require('express'),
    app = express(),
    router = express.Router(),
    index = 0,
    zoneData = new ZoneData();

const errorZone = Zone.current.fork({
    name: 'ErrorZone',
    onHandleError: (parente, current, target, error) => {
        // console.log(`Error - ${error} Zone name: ${Zone.current.name}`);
    }
});

const firstZone = errorZone.fork({
    name: 'firstZone',
    onScheduleTask(parent, current, target, task) {
        parent.scheduleTask(target, task);
        console.log(`Scheduled ${task.source}. Zone name: ${target.name}`);
    },
    onHasTask(parent, current, target, hasTask) {
        // if (hasTask.macroTask) {
        //   console.log(`There are MacroTasks.`);
        // } else {
        //   console.log(`All MacroTasks have been completed.`);
        // }
    },
    properties: { data: 'data1' }
});

/**
 * 
 * Properties:
 * 
 * firstZone.get('data') => 'data1';
 * firstZone.getZoneWith('data') => 'firstZone';
 * 
 * secondZone.get('data') => 'data1';
 * secondZone.getZoneWith('data') => 'firstZone';
 * 
 */

const secondZone = firstZone.fork({
    name: 'secondZone'
});

app.use((req, res, next) => {
    // console.log();
    firstZone.run(() => {
        index++;

        setTimeout(() => {
            if (index === 3 || index === 4) throw new Error(`Error test.`);
            safeZoneData(firstZone, {
                value: 'data'
            });
        }, 0);

        // console.log(`Code started in zone with name «${Zone.current.name}»`);
    });
    next();
});

router.get('/', function(req, res) {
    safeZoneData(secondZone, {
        url: req.url
    });

    let message = secondZone.run(inform);
    // res.send(message);
});

router.get('/test', function(req, res) {
    res.send(zoneData.getData());
});

app.use('/', router);
app.listen(3001, () => {
    console.log(`Start server on ${3001} port`);
});

const inform = () => {    
    setTimeout(() => {
        if (index === 5 || index === 4) throw new Error(`Error test.`);

        safeZoneData(secondZone, {
            value: 'data'
        });

    }, 0);

    // console.log(`Code started in zone with name «${Zone.current.name}»`);

    // return `Running request #${index} within zone: ${Zone.current.name} (URL: ${Zone.current.data.url})`;
}

function ZoneData() {
    this.data = {};

    this.setData = function (zone, data) {
        this.data[zone] = data;        
    }

    this.getData = function () {
        return this.data;
    }
}

/**
 * 
 * ZoneData.getData() => {
 *      firstZone: data: { value: 'data' },
 *      secondZone: data: {
    *      url: '/',
    *      value: 'data'
 *      }
 * };
 * 
 */

function safeZoneData(zone, data) {
    if (zone['data'] === undefined) {
        zone['data'] = {};
    }

    for (const key in data) {
        zone.data[key] = data[key];
    }
    zoneData.setData(zone.name, zone.data);
}

/**
 * 
 * secondZone.data => {
 *      url: '/',
 *      value: 'data'
 * };
 * 
 */




module.exports = function (Zone) {
    // console.log("func");
    
    Zone.current.data.user = {
        id: 1
    };
    console.log("func",Zone.current.name);
}