const kafka = require('node-rdkafka');
//Stormwind
const producer = new kafka.Producer({
    "metadata.broker.list": "kafka:9092",
    "group.id": "hello-group",
    'batch.num.messages': 10,
    dr_cb: true
});
producer.on('delivery-report', function (err, report) {
    console.log('delivery-report: ' + JSON.stringify(report));
});
producer.on('ready', function () {
    console.log('Producer is ready');
    for (let i = 0; i < 3; i++) {
        producer.produce("ritul-topic", -1, Buffer.from(`message ${i}`));
    }
});
producer.on('event.error', (err) => {
    console.log('Event error', err);
})
producer.on('disconnected', function (arg) {
    console.log('Producer disconnected. ', arg);
});
producer.connect();





function reloadWin() {
    $.ajax({
        url: window.location.href,
        headers: {
            "Pragma": "no-cache",
            "Expires": -1,
            "Cache-Control": "no-cache"
        }
    }).done(function () {
        window.location.reload(true);
    });
}