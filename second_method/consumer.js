const kafka = require('node-rdkafka');

// Create the first consumer
const consumer1 = new kafka.KafkaConsumer({
    "group.id": "group1",
    "metadata.broker.list": "localhost:9092"
});
// Wait for the ready event before consuming messages
consumer1.on("ready", () => {
    // Consume messages from the topic
    console.log("Consumer 1 ready");
    consumer1.subscribe(["second-topic"]);
    consumer1.consume();
}).on("data", (message) => {
    // Consume the message
    console.log(`Consumer1: ${message.value.toString()}`);
    consumer1.commit(message);
});

// Create the second consumer
const consumer2 = new kafka.KafkaConsumer({
    "group.id": "group1",
    "metadata.broker.list": "localhost:9092"
});

// Wait for the ready event before consuming messages
consumer2.on("ready", () => {
    // Consume messages from the topic
    console.log("Consumer 2 ready");
    consumer2.subscribe(["second-topic"]);
    consumer2.consume();
}).on("data", (message) => {
    // Consume the message
    console.log(`Consumer2: ${message.value.toString()}`);
    consumer2.commit(message);

});

// Create the first consumer
const consumer3 = new kafka.KafkaConsumer({
    "group.id": "group1",
    "metadata.broker.list": "localhost:9092"
});

// Wait for the ready event before consuming messages
consumer3.on("ready", () => {
    // Consume messages from the topic
    console.log("Consumer 3 ready");
    consumer3.subscribe(["second-topic"]);
    consumer3.consume();
}).on("data", (message) => {
    // Consume the message
    console.log(`Consumer3: ${message.value.toString()}`);
    consumer3.commit(message);
});

// Connect the consumer to the Kafka broker
consumer1.connect();
consumer2.connect();
consumer3.connect();