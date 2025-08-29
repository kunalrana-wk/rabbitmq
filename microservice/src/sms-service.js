const amqp = require('amqplib')

async function recvSMS(){
    try {
        const queue = "sms_queue"
        
        const connection = await amqp.connect('amqp://localhost')
        const channel = await connection.createChannel()

        await channel.assertQueue(queue,{durable:false})

        channel.consume(queue,(message) => {
            if(message !== null) {
                const data = JSON.parse(message.content.toString())
                console.log(data)
                console.log("Message Received Successfully")
                channel.ack(message)
            }
        })
    } catch (error) {
        console.log("Error in SMS service",error)
    }
}


recvSMS()