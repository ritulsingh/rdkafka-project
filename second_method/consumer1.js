const kafka = require('node-rdkafka');

// Create the first consumer
const consumer1 = new kafka.KafkaConsumer({
    "group.id": "group1",
    "metadata.broker.list": "localhost:9092"
});

let count = 0;
// Wait for the ready event before consuming messages
consumer1.on("ready", () => {
    // Consume messages from the topic
    console.log("Consumer 1 ready");
    consumer1.subscribe(["second-topic"]);
    consumer1.consume();
}).on("data", (message) => {
    // Consume the message
    count++;
    console.log(`Consumer1: ${message.value.toString()}`);
    consumer1.commit(message);
    console.log(count);
});

consumer1.connect();