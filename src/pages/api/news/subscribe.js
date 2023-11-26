import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "method not allowed" });
    }
    const { email } = JSON.parse(req.body);
    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        // Create a Nodemailer transporter using Gmail credentials from .env
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        // Email configuration with HTML content
        const mailOptions = {
            from: process.env.FROM_INNERSPACE,
            to: email,
            subject: "Subscription Confirmation",
            html: `
        <html>
          <head>
            <style>
              /* Add your styles here */
              body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>Thank You for Subscribing!</h2>
              <p>We appreciate your interest. Stay tuned for updates!</p>
            </div>
          </body>
        </html>
      `,
        };

        // Send the email
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res
                    .status(500)
                    .json({ error: "Oops something went wrong" });
            } else {
                return res.status(200).json({ success: true });
            }
        });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
