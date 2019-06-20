const express = require('express');
const redis = require('redis')
const port = process.env.PORT || 8081

const app = express();
const client = redis.createClient({
    host: 'redis-server', //running on docker container
    port: 6379 // default port number
});
client.set('visits', 0);

// route handler
app.get('/', (req, res) => {
    client.get('visits', (err, visits) => {
        res.send('Number of visits is ' + visits);
        client.set('visits', parseInt(visits) + 1);

    })
})



app.listen(port, () => console.log(`Listening on port ${port}`))