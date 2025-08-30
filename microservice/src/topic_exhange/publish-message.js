// const amqp = require('amqplib')



// // Publish example messages 
// async function publishMessage() {
//     try {
//         const connection = await amqp.connect('amqp://localhost')
//         const channel = await connection.createChannel()
//         const exchange = "ecommerce_topic_exchange"

//          const messages = [
//             { routingKey: "order.created.us", message: "Order created in US" },
//             { routingKey: "order.created.in", message: "Order created in India" },
//             { routingKey: "order.shipped.us", message: "Order shipped in US" },
//             { routingKey: "order.shipped.in", message: "Order shipped in India" },
//             { routingKey: "order.cancelled.us", message: "Order cancelled in US" },
//             { routingKey: "order.cancelled.in", message: "Order cancelled in India" },
//             { routingKey: "payment.success.in", message: "Payment success in India" },
//             { routingKey: "payment.failed.us", message: "Payment failed in US" }
//         ];

//         for(const msg of messages){
//             channel.publish(exchange,msg.routingKey,Buffer.from(msg.message))
//             console.log(`Sent Message: ${msg.message} with routing key ${msg.routingKey}`)
//         }

//         // close connection after publishing
//         setTimeout(() => {
//             connection.close()
//         },500)
//     } catch (error) {
//         console.log("Error Publishing message:",error)
//     }
// }

// module.exports = {
//     publishMessage
// }



const amqp = require('amqplib')

async function publishMessage() {
    try {
        const connection = await amqp.connect('amqp://localhost')
        const channel = await connection.createChannel()
        const exchange = "ecommerce_topic_exchange"

        const messages = [
            { routingKey: "order.created.us", message: "Order created in US" },
            { routingKey: "order.created.in", message: "Order created in India" },
            { routingKey: "order.shipped.us", message: "Order shipped in US" },
            { routingKey: "order.shipped.in", message: "Order shipped in India" },
            { routingKey: "order.cancelled.us", message: "Order cancelled in US" },
            { routingKey: "order.cancelled.in", message: "Order cancelled in India" },
            { routingKey: "payment.success.in", message: "Payment success in India" },
            { routingKey: "payment.failed.us", message: "Payment failed in US" }
        ]

        for (const msg of messages) {
            channel.publish(exchange, msg.routingKey, Buffer.from(msg.message))
            console.log(`📤 Sent: ${msg.message} (routing key: ${msg.routingKey})`)
        }

        setTimeout(() => connection.close(), 500)
    } catch (error) {
        console.error("Error publishing message:", error)
    }
}

module.exports = { publishMessage }
