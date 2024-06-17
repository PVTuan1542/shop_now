import { error } from 'console';
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

export class TwilioService {
  private client = twilio(accountSid, authToken);
  
  async sendSMS(data: SendSMS) {
    const { phone, title, content } = data;

    this.client.messages
      .create({
        body: content,
        from: twilioPhoneNumber,
        to: phone
      })
  }

  async sendOTP(phone: string) {
    try {
      const formatPhone = `+84${phone.slice(1)}`
      const verification = await this.client.verify.v2.services(twilioServiceSid!).verifications
        .create({ to: formatPhone, channel: 'sms'});

      console.log('verification', verification);
  
      return {
        success: true
      };
    } catch (error) {
      console.error('Error sending OTP:', error);
      return {
        success: false,
        error: error,
        // status: error.
      }
    }
  }

  async verifyOTP(phone: string, code: string) {
    try {
      const verify = await this.client.verify.v2.services(twilioServiceSid!).verificationChecks.create({to: phone, code: code});

      if(verify.status === 'approved') {
        return {
          success: true,
          data: verify,
        }
      } else {
        return {
          success: false,
          error: "Verify failed!"     
        }
      }
      
    } catch (error) {
      return {
        success: false,
        error: error,
        status: 500,
      }
    }
  }
}
