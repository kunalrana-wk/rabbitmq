
// const amqp = require('amqplib')

// async function consumeMessage() {
//     try {
//         const connection = await amqp.connect('amqp://localhost')
//         const channel = await connection.createChannel()

//         const queues = [
//             "queue_order_created",
//             "queue_order_us",
//             "queue_order_in",
//             "queue_payment"
//         ]

//         for(const queue of queues){
//             await channel.assertQueue(queue,{durable:false})
//             channel.consume(queue,(msg) => {
//                 if(msg) {
//                     console.log(`[${queue}] Received: ${msg.content.toString()}`)
//                     channel.ack(msg)
//                 }
//             })
//         }
//     } catch (error) {
//         console.log('Error Consuming message:',error)
//     }
// }

// module.exports = {consumeMessage}


const amqp = require('amqplib')

async function consumeMessage() {
    try {
        const connection = await amqp.connect('amqp://localhost')
        const channel = await connection.createChannel()

        const queues = [
            "queue_order_created",
            "queue_order_us",
            "queue_order_in",
            "queue_payment"
        ]

        for (const queue of queues) {
            await channel.assertQueue(queue, { durable: false })
            channel.consume(queue, (msg) => {
                if (msg) {
                    console.log(`📥 [${queue}] Received: ${msg.content.toString()}`)
                    channel.ack(msg)
                }
            })
        }
    } catch (error) {
        console.error("Error consuming message:", error)
    }
}

module.exports = { consumeMessage }
