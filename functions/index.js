const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(functions.config().sendgrid.key);

export const welcomeEmail = functions.auth.onCreate((user) => {
  const msg = {
    to: 'shashwatgupta4656@gmail.com',
    // from: 'surgicoach@gmail.com',
    templateId: 'd-b85d5ff3438e4c548cd9588dccc2422e',
    dynamic_template_data: {
      email: user.email,
    },
  };
  return sgMail.send(msg);
});
