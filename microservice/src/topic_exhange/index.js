
const { queueSetup } = require('./queue-setup')
const { consumeMessage } = require('./consume-message')
const { publishMessage } = require('./publish-message')


console.log("queueSetup import:", require('./queue-setup'))
console.log("publishMessage import:", require('./publish-message'))
console.log("consumeMessage import:", require('./consume-message'))


(async () => {
    await queueSetup()
    await publishMessage()
    await consumeMessage()
})()

