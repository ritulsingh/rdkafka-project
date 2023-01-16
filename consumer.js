const kafka = require('node-rdkafka');

const consumer1 = new kafka.KafkaConsumer({
    "metadata.broker.list": "127.0.0.1:9092",
    "group.id": "hello-group",
    "auto.offset.reset": "earliest"
});
const consumer2 = new kafka.KafkaConsumer({
    "metadata.broker.list": "127.0.0.1:9092",
    "group.id": "hello-group",
    "auto.offset.reset": "earliest"
});

const consumer3 = new kafka.KafkaConsumer({
    "metadata.broker.list": "127.0.0.1:9092",
    "group.id": "hello-group",
    "auto.offset.reset": "earliest"
});

consumer1.on("ready", function () {
    consumer1.assign([{ topic: "ritul-topic", partition: 0 }]);
    // consumer1.subscribe(['ritul-topic']);
    consumer1.consume()
    console.log("received message 1....................")
}).on('data', function (data) {
    console.log("Partition ", data.partition);
    console.log('Received message from Consumer 1:', data.value.toString());
    consumer1.commit(data);
});

consumer2.on("ready", function () {
    console.log("received message 2....................")
    // consumer2.subscribe(['ritul-topic']);
    consumer2.assign([{ topic: "ritul-topic", partition: 1 }]);
    consumer2.consume();
}).on('data', function (data) {
    console.log("Partition ", data.partition);
    console.log('Received message from Consumer 2: ' + data.value);
    consumer2.commit(data);
});

consumer3.on("ready", function () {
    console.log("received message 3....................")
    // consumer3.subscribe(['ritul-topic']);
    consumer3.assign([{ topic: "ritul-topic", partition: 2 }]);
    consumer3.consume();
}).on('data', function (data) {
    console.log("Partition ", data.partition);
    console.log('Received message from Consumer 3: ' + data.value);
    consumer3.commit(data);
});

consumer1.connect();
consumer2.connect();
consumer3.connect();

