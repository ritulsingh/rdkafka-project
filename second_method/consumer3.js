const kafka = require('node-rdkafka');

// Create the first consumer
const consumer3 = new kafka.KafkaConsumer({
    "group.id": "group1",
    "metadata.broker.list": "localhost:9092"
});
let count = 0;
// Wait for the ready event before consuming messages
consumer3.on("ready", () => {
    // Consume messages from the topic
    console.log("Consumer 3 ready");
    consumer3.subscribe(["second-topic"]);
    consumer3.consume();
}).on("data", (message) => {
    // Consume the message
    count++;
    console.log(`Consumer3: ${message.value.toString()}`);
    consumer3.commit(message);
    console.log(count);
});


consumer3.connect();
