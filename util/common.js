module.exports = (key, value) => {
    let result = value;
	
    for (let index in process.argv) {
        let keyValue = process.argv[index].split("=", 2);
        pref = keyValue[0].toLowerCase();

        if (pref === key) {
            result = key === "local" ? result = "mongodb://myadmin:mysecret@127.0.0.1:27017/admin" : result = keyValue[1];
            break;
        }
    }
    return result;
}