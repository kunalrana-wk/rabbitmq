const amqplib = require('amqplib')

async function sendMessage() {
    try {
        const connection = await amqplib.connect('amqp://localhost')
        const channel = await connection.createChannel()
        const mailQueue = "mail_queue"
        const smsQueue = "sms_queue"

        const exchange = "notification_exchange"
        const routingKey_for_mailservice = "send_mail"
        const routingKey_for_smsservice = "send_sms"

        const mail = {
            to: "rahul@gmail.com",
            from: "hariah@gmail.com",
            subject: "EMAIL-Booking Successfull",
            body: "Your Booking has been successfully Done"
        }

        const message = {
            to: "9458545854",
            from: "8587454785",
            subject: "MESSAGE-Booking Successfull",
            body: "Your Booking is Successfully done"
        }

        await channel.assertExchange(exchange,"direct",{durable:false})

        await channel.assertQueue(smsQueue,{durable:false})
        await channel.assertQueue(mailQueue,{durable:false})

        await channel.bindQueue(smsQueue,exchange,routingKey_for_smsservice)
        await channel.bindQueue(mailQueue,exchange,routingKey_for_mailservice)

        channel.publish(exchange,routingKey_for_smsservice,Buffer.from(JSON.stringify(message)))
        channel.publish(exchange,routingKey_for_mailservice,Buffer.from(JSON.stringify(mail)))

        console.log("SMS Data was sent",message)
        console.log("Mail Data was sent",mail)

        setTimeout(() => {
            channel.close()
            console.log("Connection Closed")
        },500)
    } catch (error) {
        
    }
}

sendMessage()
