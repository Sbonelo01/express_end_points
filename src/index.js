const express = require('express');
const app = express();
const {
    addNewVisitor,
    listAllVisitors,
    deleteVisitor,
    deleteVisitors,
    viewVisitor,
    updateVisitor
} = require('../src/app');
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.post('/addNewVisitor', async(req, res) => {
    const name = req.body.visitorName
    const age = req.body.visitorAge
    const dateOfVisit = req.body.dateOfVisit
    const timeOfVisit = req.body.timeOfVisit
    const nameOfAssistant = req.body.nameOfAssistant
    const comments = req.body.comments
    const visitor = await addNewVisitor(visitorName, visitorAge, dateOfVisit, timeOfVisit, nameOfAssistant, comments)
    res.send(JSON.stringify(visitor));
    res.end();
})

app.delete('/deleteVisitor/:id', async(req, res) => {
    const visitor = await deleteVisitor(req.params.id);
    res.send(JSON.stringify(visitor));
    res.end();
})

app.delete('/deleteVisitors', async(req, res) => {
    const visitor = await deleteVisitors();
    res.send(JSON.stringify(visitor));
    res.end();
})

app.get('/viewVisitors', async(req, res) => {
    const visitor = await listAllVisitors();
    res.send(JSON.stringify(visitor));
    res.end();
})

app.get('/viewVisitor/:id', async(req, res) => {
    const visitor = await viewVisitor(req.params.id);
    res.send(JSON.stringify(visitor));
    res.end();

})

app.put('/updateVisitor/:id', async(req, res) => {
    const id = req.params.id
    const name = req.body.visitorName
    const age = req.body.visitorAge
    const dateOfVisit = req.body.dateOfVisit
    const timeOfVisit = req.body.timeOfVisit
    const nameOfAssistant = req.body.nameOfAssistant
    const comments = req.body.comments
    const visitor = await updateVisitor(id, visitorName, visitorAge, dateOfVisit, timeOfVisit, nameOfAssistant, comments)
    res.send(JSON.stringify(visitor));
    res.end();
})

const server = app.listen({port}, () => {
    console.log(`Server is running on port ${port}`)
});

module.exports = {
    server
}
 
