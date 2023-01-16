const kafka = require('node-rdkafka');
//Stormwind
const producer = new kafka.Producer({
    "metadata.broker.list": "127.0.0.1:9092",
    "group.id": "hello-group",
    dr_cb: true
});
producer.on('delivery-report', function (err, report) {
    console.log('delivery-report: ' + JSON.stringify(report));
});
producer.on('ready', function () {
    console.log('Producer is ready');
    for (let i = 0; i < 3; i++) {
        producer.produce("ritul-topic", i, Buffer.from(`message ${i}`));
    }
    // producer.produce("ritul-topic", 0, Buffer.from(`message 0`));
    // producer.produce("ritul-topic", 1, Buffer.from(`message 1`));
    // producer.produce("ritul-topic", 2, Buffer.from(`message 2`));
});
producer.on('event.error', (err) => {
    console.log('Event error', err);
})
producer.on('disconnected', function (arg) {
    console.log('Producer disconnected. ', arg);
});
producer.connect();