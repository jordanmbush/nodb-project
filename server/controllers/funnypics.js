
let pictures = [
    {1: "https://ca.slack-edge.com/T039C2PUY-U6GRDV010-1f2564364b61-48"},
    {2: "https://ca.slack-edge.com/T039C2PUY-U69UDBWDQ-bd7f1771ea54-48"},
    {3: "https://ca.slack-edge.com/T039C2PUY-U69AU4FAR-6e48d0f8c405-48"},
    {4: "https://ca.slack-edge.com/T039C2PUY-U0C2K5G8Z-b1453e76137d-48"},
    {5: "https://avatars1.githubusercontent.com/u/366538?s=460&v=4"},
    {6: "https://ca.slack-edge.com/T039C2PUY-U6GRDV010-1f2564364b61-48"},

];

module.exports = {
    read(req, res) {
        let randomKey = Math.floor(Math.random() * pictures.length) + 1  
        res.status(200).send(pictures[randomKey][randomKey + 1]);
    },

}