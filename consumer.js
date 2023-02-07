const kafka = require('node-rdkafka');

const consumer = new kafka.KafkaConsumer({
    "metadata.broker.list": "kafka:9092",
    "group.id": "hello-group",
    'fetch.min.bytes': 10000,
    'fetch.wait.max.ms': 10000
});

consumer.on("ready", function () {
    consumer.subscribe(['ritul-topic']);
    consumer.consume()
    console.log("received message 1....................")
}).on('data', function (data) {
    console.log('Received message from Consumer 1:', data.value.toString());
    consumer.commit(data);
});

consumer.connect();

// consumer.on('ready', () => {
//     consumer.subscribe(['myTopic']);
//     setInterval(() => {
//         consumer.consume((err, messages) => {
//             if (err) {
//                 console.error(err);
//             } else {
//                 for (let i = 0; i < messages.length; i++) {
//                     console.log(`Message received: ${messages[i].value.toString()}`);
//                 }
//             }
//         });
//     }, 1000);
// });

consumer.on('event.error', (err) => {
    console.error(err);
});

