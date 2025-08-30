
// const amqp = require('amqplib')

// async function queueSetup() {
//     try {
//         console.log("QUEUE SETUP CALLED")
//         const connection = await amqp.connect('amqp://localhost')
//         const channel = await connection.createChannel()

//         const exchange = "ecommerce_topic_exchange"

//         // us and in represent here for the united state and india
//         const ORDER_CREATED_IN = "order.created.in"
//         const ORDER_SHIPPED_IN = "order.shipped.in"
//         const ORDER_CANCELLED_IN = "order.cancelled.in"
//         const ORDER_CREATED_US = "order.created.us"
//         const ORDER_SHIPPED_US = "order.shipped.us"
//         const ORDER_CANCELLED_US = "order.cancelled.us"
//         const PAYMENT_SUCCESS_IN = "payment.success.in"
//         const PAYMENT_FAILED_US = "payment.failed.us"

//         const QUEUE_ORDER_CREATED = "queue_order_created"
//         const QUEUE_ORDER_US = "queue_order_us"
//         const QUEUE_ORDER_IN = "queue_order_in"
//         const QUEUE_PAYMENT = "queue_payment"

//         // assertion of exchange to the channel
//         await channel.assertExchange(exchange, "topic", { durable: false })

//         // assertion of queue to the channel
//         await channel.assertQueue(QUEUE_ORDER_CREATED, { durable: false })
//         await channel.assertQueue(QUEUE_ORDER_US, { durable: false })
//         await channel.assertQueue(QUEUE_ORDER_IN, { durable: false })
//         await channel.assertQueue(QUEUE_PAYMENT, { durable: false })

//         // bind the queue with the exchange
//         await channel.bindQueue(QUEUE_ORDER_CREATED, exchange, ORDER_CREATED_IN)
//         await channel.bindQueue(QUEUE_ORDER_CREATED, exchange, ORDER_CREATED_US)
//         await channel.bindQueue(QUEUE_ORDER_IN, exchange, ORDER_SHIPPED_IN)
//         await channel.bindQueue(QUEUE_ORDER_IN, exchange, ORDER_CANCELLED_IN)
//         await channel.bindQueue(QUEUE_ORDER_US, exchange, ORDER_SHIPPED_US)
//         await channel.bindQueue(QUEUE_ORDER_US, exchange, ORDER_CANCELLED_US)
//         await channel.bindQueue(QUEUE_PAYMENT, exchange, PAYMENT_SUCCESS_IN)
//         await channel.bindQueue(QUEUE_PAYMENT, exchange, PAYMENT_FAILED_US)

//     } catch (error) {
//         console.log("Error setting up queues:", error);
//     }
// }

// module.exports = {
//     queueSetup
// }


const amqp = require('amqplib')

async function queueSetup() {
    try {
        const connection = await amqp.connect('amqp://localhost')
        const channel = await connection.createChannel()

        const exchange = "ecommerce_topic_exchange"

        const ORDER_CREATED_IN = "order.created.in"
        const ORDER_SHIPPED_IN = "order.shipped.in"
        const ORDER_CANCELLED_IN = "order.cancelled.in"
        const ORDER_CREATED_US = "order.created.us"
        const ORDER_SHIPPED_US = "order.shipped.us"
        const ORDER_CANCELLED_US = "order.cancelled.us"
        const PAYMENT_SUCCESS_IN = "payment.success.in"
        const PAYMENT_FAILED_US = "payment.failed.us"

        const QUEUE_ORDER_CREATED = "queue_order_created"
        const QUEUE_ORDER_US = "queue_order_us"
        const QUEUE_ORDER_IN = "queue_order_in"
        const QUEUE_PAYMENT = "queue_payment"

        await channel.assertExchange(exchange, "topic", { durable: false })

        await channel.assertQueue(QUEUE_ORDER_CREATED, { durable: false })
        await channel.assertQueue(QUEUE_ORDER_US, { durable: false })
        await channel.assertQueue(QUEUE_ORDER_IN, { durable: false })
        await channel.assertQueue(QUEUE_PAYMENT, { durable: false })

        await channel.bindQueue(QUEUE_ORDER_CREATED, exchange, ORDER_CREATED_IN)
        await channel.bindQueue(QUEUE_ORDER_CREATED, exchange, ORDER_CREATED_US)
        await channel.bindQueue(QUEUE_ORDER_IN, exchange, ORDER_SHIPPED_IN)
        await channel.bindQueue(QUEUE_ORDER_IN, exchange, ORDER_CANCELLED_IN)
        await channel.bindQueue(QUEUE_ORDER_US, exchange, ORDER_SHIPPED_US)
        await channel.bindQueue(QUEUE_ORDER_US, exchange, ORDER_CANCELLED_US)
        await channel.bindQueue(QUEUE_PAYMENT, exchange, PAYMENT_SUCCESS_IN)
        await channel.bindQueue(QUEUE_PAYMENT, exchange, PAYMENT_FAILED_US)

        console.log("Queues and exchange setup completed ✅")
    } catch (error) {
        console.error("Error setting up queues:", error)
    }
}

module.exports = { queueSetup }

