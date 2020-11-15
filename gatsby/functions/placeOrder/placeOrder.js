const nodemailer = require('nodemailer')

function generateOrderEmail({ order, total }) {
    return `<div>
        <h1>Your Recent Order for ${total}</h1>
        <p>Please start walking over, we will have your order ready in the next 20 minutes!</p>
        <ul>
            ${order
                .map(
                    (item) => `<li>
                        <img src="${item.thumbnail}" alt="${item.name}" />
                        <div>
                            <h2>${item.name}</h2>
                            <p>${item.size} - ${item.price}</p>
                        </div>
                    </li>`
                )
                .join('')}
        </ul>
        <hr>
        <h2>Your total is <strong>$${total}</strong> due at pickup.</h2>
        <style>
                ul {
                    list-style: none;
                    margin: 1rem 0;
                    padding: 0;
                }
                li {
                    display: grid;
                    grid-template-columns: 100px 1fr;
                    grid-gap: 1rem;
                    margin: 1rem 0;
                    padding: 0;
                }
        </style>
    </div>`
}
// create a transport for nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
})

exports.handler = async (event, context) => {
    const body = JSON.parse(event.body)
    console.log(body)
    // validate the data coming in is correct
    const requiredFields = ['name', 'email', 'order']

    // send the success or error message
    for (const field of requiredFields) {
        console.log(`checking the ${field} is good`)
        if (!body[field]) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: `Oops! You are missing the ${field} field`,
                }),
            }
        }
    }

    //  send an email
    const info = await transporter.sendMail({
        from: "Slick's Slices <slick@example.com>",
        to: `${body.name} <${body.email}>, orders@example.com`,
        subject: 'New Pizza Order!',
        html: generateOrderEmail({ order: body.order, total: body.total }),
    })
    console.log(info)
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Success' }),
    }
}
