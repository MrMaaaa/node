var events = require('events');

var eventEmitter = new events.EventEmitter();

var connectHandler = function connected() {
    console.log('connect success.');

    //触发data_received事件
    eventEmitter.emit('data_received');
};

//绑定connection事件处理程序connectHandler
eventEmitter.on('connection', connectHandler);

//绑定data_received事件处理程序（匿名函数）
eventEmitter.on('data_received', function() {
    console.log('received success.');
});

eventEmitter.emit('connection');
console.log('program end.');