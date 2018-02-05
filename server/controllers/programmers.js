let id = 0;
let programmers = [
    // ===============THIS IS WHAT A PROGRAMMER OBJECT SHOULD LOOK LIKE==================
    // {
    //     name: 'test name',
    //     age: 1000,
    //     battleReady: false,
    //     codeSkills: {
    //         react: 1,
    //         javascript: 2,
    //         html: 3,
    //         css: 4,
    //         node: 5,
    //         sql: 6,
    //         committment: 7,
    //         commandPrompt: 8,
    //     },
    //     imgURL: 'test image url',
    //     id: 0
    // }
];

module.exports = {
    create(req, res) {
        console.log('create req body: ',req.body);
        let programmer = Object.assign({}, req.body);
        console.log("id: ", id)
        programmer.id = id;
        console.log(programmer);
        programmers.push(programmer);
        id++;
        res.status(200).send(programmers);
    },

    read(req, res) {
        res.status(200).send(programmers);
    },

    update(req, res) {
        let id = req.params.id;
        console.log("put id", id)
        for(let i = 0; i < programmers.length; i++) {
            if(programmers[i].id === parseInt(id)) {
                programmers.splice(i,1);
                break;
                console.log("new list: ", programmers);
            }
        }
        let updatedProgrammer = Object.assign({}, req.body);
        updatedProgrammer.id = parseInt(id);
        programmers.push(updatedProgrammer);
        res.status(200).send(programmers);
    },

    delete(req, res) {
        let id = req.query.id;
        for(let i = 0; i < programmers.length; i++) {
            if(programmers[i].id === parseInt(id)) {
                programmers.splice(i,1);
                break;
            }
        }

        res.status(200).send(programmers);
    }
}