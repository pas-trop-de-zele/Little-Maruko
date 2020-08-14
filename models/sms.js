const TwilioCredentials = require("../credentials/twilio");

class Sms {
    constructor(){
        this.accountSid = TwilioCredentials.accountSid;
        this.authToken = TwilioCredentials.authToken;
        this.client = require("twilio")(this.accountSid, this.authToken);
    }

    messageConfirmReceived(name, number, callback) {
        this.client.messages
            .create({
                body: `Hello ${name}, your order was received, we will notify you when it is ready for pick up`,
                from: TwilioCredentials.phone,
                statusCallback: "http://48e196ff88ee.ngrok.io/dashboard/status",
                to: `+1${number}`
            })
            .then(message => {
                console.log(`Notify order received for ${name} - ${number}`);
                callback();
            });
    }

    messasgeReadyToPickUp(name, number, callback) {
        this.client.messages
            .create({
                body: `Hello ${name}, your order is ready for pick up`,
                from: TwilioCredentials.phone,
                statusCallback: "http://48e196ff88ee.ngrok.io/dashboard/status",
                to: `+1${number}`
            })
            .then(message => {
                console.log(`Notify order ready for pick up for ${name} - ${number}`);
                callback();
            });
    }
}

module.exports = Sms;