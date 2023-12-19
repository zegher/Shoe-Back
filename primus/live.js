// primus/live.js
const Primus = require('primus');

function initialize(server) {
  const primus = new Primus(server, {
    transformer: 'websockets',
    pingInterval: false,
  });

  primus.on('connection', (spark) => {
    console.log('connected');

    spark.on('data', (data) => {
        console.log('data:', data);
        primus.write(data); // Broadcast data to all connected clients

        // Enhance logging to include content of data being sent
        console.log('Data sent through WebSocket:', data);
    });
  });

  return primus;
}

module.exports = {
  initialize,
};