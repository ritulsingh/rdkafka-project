const kafka = require("node-rdkafka");

// Create a new producer
const producer = new kafka.Producer({
  "metadata.broker.list": "localhost:9092",
  "group.id": "hello-group",
  dr_cb: true
});

// Wait for the ready event before producing messages
producer.on("ready", () => {
  console.log("Producer ready");
  for (let i = 0; i < 10000; i++) {
    // Produce messages with a key
    producer.produce("second-topic", -1, Buffer.from(`message ${i}`));
  }
});

producer.on('event.error', (err) => {
  console.log('Event error', err);
})
producer.on('disconnected', function (arg) {
  console.log('Producer disconnected. ', arg);
});

// Connect the producer to the Kafka broker
producer.connect();