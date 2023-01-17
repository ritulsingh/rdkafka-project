const kafka = require('node-rdkafka');

// Create the second consumer
const consumer2 = new kafka.KafkaConsumer({
    "group.id": "group1",
    "metadata.broker.list": "localhost:9092"
});
let count = 0;
// Wait for the ready event before consuming messages
consumer2.on("ready", () => {
    // Consume messages from the topic
    console.log("Consumer 2 ready");
    consumer2.subscribe(["second-topic"]);
    consumer2.consume();
}).on("data", (message) => {
    // Consume the message
    count++;
    console.log(`Consumer2: ${message.value.toString()}`);
    consumer2.commit(message);
    console.log(count);

});

consumer2.connect();