import * as SparkPost from "sparkpost";

const client = new SparkPost(process.env.SPARKPOST_API_KEY || "API_KEY");

export const sendEmail = async (receipient: string, url: string) => {
  const response = await client.transmissions.send({
    options: {
      sandbox: true
    },
    content: {
      from: "testing@sparkpostbox.com",
      subject: "GraphQL Registration Confirmation Email",
      html: `<html>
          <body>
          <p>Testing SparkPost - the world's most awesomest email service!</p>
          <a href="${url}">Confirm Email</a>
          </body>
          </html>`
    },
    recipients: [{ address: receipient }]
  });
  console.log(response);
};
