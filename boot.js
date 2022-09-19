const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
const events = []

app.post('/events', (req, res) => {
    const event = req.body
    events.push(event)

    console.log('Events pushed:', events)
    axios.post('http://localhost:3001/events', event).catch((err) => {
        console.log(err.message);
      });
    axios.post('http://localhost:3002/events', event).catch((err) => {
        console.log(err.message);
      });
    axios.post('http://localhost:5005/events', event).catch((err) => {
        console.log(err.message);
      });
    axios.post('http://localhost:5010/events', event).catch((err) => {
        console.log(err.message);
      });

    res.send({ status: 'OK' })
})
app.get('/events', (req, res) => {
    console.log('Get events', events)
    res.send(events)
})
app.listen(PORT, () => {
    console.log(`event-bus listening on port ${PORT}`)
})