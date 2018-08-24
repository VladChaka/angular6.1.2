let getAll123 = () => {
    return new Promise((resolve, reject) => {
        let a = 2;

        if (a !== 1) {
            reject('Error');
        }

        resolve("eeeeeeeeeeeeeeeeeeeeeeee");
    });
}

getAll123()
.then((test) => {
    console.log(test);
})
.catch((err) => {
    console.log(err);
});