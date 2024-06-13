import twilio from 'twilio'

interface SendSMS {
  phone: string;
  title: string;
  content: string;
}
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const twilioServiceSid = process.env.TWILIO_SERVICE_SID

const client = twilio(accountSid, authToken);

export class TwilioService {

  async sendSMS(data: SendSMS) {
    const { phone, title, content } = data;

    client.messages
      .create({
        body: content,
        from: twilioPhoneNumber,
        to: phone
      })
  }

  async sendOTP(phone: string) {
    try {
      const formatPhone = `+84${phone.slice(1)}`
      const verification = await client.verify.v2.services(twilioServiceSid!).verifications
        .create({ to: formatPhone, channel: 'sms'});
  
      return verification;
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  }
}
