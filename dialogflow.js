'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const {dialogflow} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});

// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.
const facts = ['The original name of Bits Pilani Hyderabad campus was supposed to be Bits pilani Thumkunta campus and was changed last minute',
              'We all live in a simulation',
              'Befriend any Agarwal you find real quick. They need it',
              'Atticus is an old roman nickname meaning man of attica',
              'A swimming pool is coming next semester, guys',
              'Next sem phodege',
              'A Pearl is very expensive',
              'Have Mess 2, want Mess 1',
              'Inconvenience is regretted',
              'BITSians like the Sun because its the source of light',
              'The rocks rock',
              ''
              ];
function get_random(list) {
  return list[Math.floor((Math.random()*list.length))];
} 
app.intent('YesOrNo', (conv, {cons}) => {
   
    //var text = "";
  	//for(let i=0;i<cons.length;i++){
    	//text += cons[i] + " ";
   // }
  //	console.log(text);
  	if(cons.length>1){conv.close("Say one thing, Bitch.");console.log("OP is a moron");}
  	else if(cons[0]==='yes')
    {var speech = get_random(facts);
    // Respond with the user's lucky number and end the conversation.
    conv.close(speech);}
  	else if(cons[0]==='no'){conv.close("Your loss Bitch");}

});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);