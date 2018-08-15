/*	
 *	
 *	My function
 *	
 */

function parsePath1(objectPath) {
    let path = [];

    if (typeof objectPath === 'string'){
        path = objectPath.split('.');
    } else {
        path = 'undefined';
    }
    return path;
}

function compileData1(object, template) {
    let result = {},
        dataArray = [];
		
    for (const key in template) {
        dataArray.push({
            key: key,
            template: template[key]
        });
    }

    for (let i = 0; i < dataArray.length; i++) {
        if (typeof dataArray[i]['template'] === 'object') {
            for (const key in dataArray[i]['template']) {
                result[dataArray[i]['key']] = compileData1(object, dataArray[i]['template']);
            }
        } else {
            result[dataArray[i]['key']] = getData1(object, dataArray[i]);
        }
    }

    return result;
}

function getData1(object, dataArray) {
    let result = {},
        path = parsePath1(dataArray['template']);

    if (path.length > 1) {
        result = object;

        for (let i = 0; i < path.length; i++) {
            if (result[path[i]] === undefined) {
                result = 'undefined';
            } else {
                result = result[path[i]];
            }
        }
    } else {
        result = object[dataArray['template']];
    }

    return result;
}

/*	
 *	
 *	Function from Maksim
 *	
 */

function parsePath(objectPath) {
    let path = [];

    if (typeof objectPath === 'string'){
        path = objectPath.split('.');
    } else {
        path = 'undefined';
    }
    return path;
}

function compileData(object, template) {
    let result = {},
        destination = result,
        dataArray = [],
        index = 0;

    for (const key in template) {
        dataArray.push({
            key: key,
            template: template[key],
            destination: destination
        });
    }

    for (let i = 0; i < dataArray.length - index; i++) {
        if (typeof dataArray[i]['template'] === 'object') {
            for (const key in dataArray[i]['template']) {
                dataArray.push({
                    key: key,
                    template: dataArray[i]['template'][key],
                    destination: destination
                });
                index++;
            }

            dataArray[i]['destination'] = {};
            for (let j = dataArray.length - index; j < dataArray.length; j++) {
                dataArray[i]['destination'][dataArray[j]['key']] = getData(object, dataArray[j]);
            }
        } else {
            dataArray[i]['destination'] = getData(object, dataArray[i]);
        }
        result[dataArray[i]['key']] = dataArray[i]['destination'];
    }
    return result;
}

function getData(object, arr) {
    let result = {},
        path = parsePath(arr['template']);

    if (path.length > 1) {
        result = object;
        for (let i = 0; i < path.length; i++) {
            if (result[path[i]] === undefined) {
                result = 'undefined';
            } else {
                result = result[path[i]];
            }
        }
    } else {
        result = object[arr['template']];
    }

    return result;
}

let object = {
        name: 'Maksim',
        age: 25,
        password: 123,
        phones: {
            mobile: '+375 321 7654321',
            fixed: '+375 123 1234567',
            test: {
            test1: "test2"
            }
        }
    },
    template = {
        asd: 123,
        name: 'name',
        age: 'age',
        mobilePhoneNumber: 'phones.mobile',
        mobile: {
            phoneFixed: 'phones.fixed',
            test: 'phones.test.test1'
    }
    },
    result = compileData(object, template),
    result1 = compileData1(object, template);

console.log(result);
console.log(result1);