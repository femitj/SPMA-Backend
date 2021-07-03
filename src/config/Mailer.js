import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);
/**
 * @class Mailer
 */
class Mailer {
  /**
   *
   * @param {object} to Recipient Email
   * @param {string} subject Email Subject
   * @param {string} content Email Content
   * @returns {function} returns a function
   */
  static sendMail(to, subject, content) {
    const message = {
      from: process.env.EMAIL,
      to,
      html: content,
      subject
    };
    // if (process.env.NODE_ENV !== 'test') {
    //   return sgMail.send(message);
    // }
    return sgMail.send(message, (error, result) => {
      if (error) {
        //Do something with the error
        console.log(error)
      }
      else {
        //Celebrate
        console.log('success')
      }
    });
    // return sgMail.send(message)
    //   .then(() => {
    //     //Celebrate
    //     console.log('success')
    //     return "success"
    //   })
    //   .catch(error => {
    
    //     //Log friendly error
    //     console.error(error.toString());
    
    //     //Extract error msg
    //     const {message, code, response} = error;
    //     return message;
    //     //Extract response msg
    //     const {headers, body} = response;
    //   });
  }
}

export default Mailer;
