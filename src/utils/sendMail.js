import pkg from "sib-api-v3-sdk";
import { config } from "dotenv";
const { TransactionalEmailsApi, ApiClient } = pkg;

config();

const client = ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.API_KEY;

const tranEmailApi = new TransactionalEmailsApi();

export const sendUserMail = (mail, name, number) => {
  const sender = {
    email: process.env.MAIL_SENDER,
  };
  const receivers = [
    {
      email: mail,
    },
  ];
  tranEmailApi
    .sendTransacEmail({
      sender,
      to: receivers,
      subject: "Thank You for Joining Our Waitlist at DateConnect!",
      textContent: `Dear ${name},

Thank you for taking the time to join our waitlist at DateConnect. It means a lot to us that you're interested in our platform and we can't wait for you to experience all that we have to offer.

At DateConnect, we're committed to providing a seamless and enjoyable online dating experience. Our team is dedicated to making sure that everyone has the opportunity to find love and we're working hard to make that a reality.

We understand that waiting can be frustrating, but please know that your decision to join our waitlist is greatly appreciated. Rest assured that we are doing everything in our power to make the wait worth your while.

Your waitlist number is ${number}, and we'll be sure to keep you updated on any new developments.

Thank you again for joining our waitlist. We look forward to the opportunity to connect you with your perfect match!

Best regards,
Lawblaze at DateConnect`,
    })
    .then(console.log)
    .catch(console.log);
};
