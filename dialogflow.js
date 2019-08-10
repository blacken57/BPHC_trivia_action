'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const {dialogflow} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});

// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.
function shuffle(arra1) {
    let ctr = arra1.length;
    let temp;
    let index;

    // While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}
function get_random(list) {
  return list[Math.floor((Math.random()*list.length))];
} 
const facts = ['The original name of Bits Pilani Hyderabad campus was supposed to be Bits Pilani Thumkunta campus and was changed last minute',
              'Befriend any Agarwal you find real quick. They need it.',
              'Atticus is an old roman nickname meaning man of attica.',
              'A swimming pool is coming next semester, guys.',
              'A Pearl is very expensive.',
              'Have Mess 2 and want Mess 1 is the BITSian version of The grass is greener on the other side.',
              'Inconvenience will happen in life. But they will always be regretted.',
              'BITSians like the Sun because its the source of lite.',
              'There is a 90% chance of you getting beaten up if you shine a torchlight at the rocks at night.',
              'Bus number 212 is your way out and inside campus.',
              'BPHC is a ragging free, interactive campus.',
              'The sex ratio is 1:6 here. Which mathematically translates to a 99.5% chance of boys remaining single.',
              'Next semester never comes. ',
              'If the fees hike as they are now, 2119 students will pay 3.7 billion dollars.',
              'The estimated time to reach I Block from the hostels is 14 minutes 38 seconds. So, start at 7:42AM for your 8AM tutorial.',
              'If you don\'t ask a senior their CG, they won\'t ask you your Advanced Rank.',
              'Avoid Football field at night at all costs. Jesus does.',
              '2% of the campus is not single. Incidetally, 1% of campus own mature bags.'];

var askFacts = ['Do you want some more facts?',
                'Would you like another insight to your life in college?',
                'Interested in some other facts?',
                'Want one more?',
               	];
shuffle(facts);
shuffle(askFacts);

app.intent('YesOrNo', (conv, {cons}) => {
  	if(!conv.data.hasOwnProperty('count')){
    	conv.data.count = -1;
      	
    }
  	if(cons.length>1){
      conv.ask("We were too lazy to code for more than one response. So, say one thing, please.");console.log("OP is a moron");
    }else if(cons[0]==='yes'){
      conv.data.count++;
      if(conv.data.count === facts.length){
        conv.close("For any more facts or explanation visit your nearest senior. Bye.");   
      }
      else if(conv.data.count<facts.length){
      var speech = facts[conv.data.count];
      conv.ask(speech);
      conv.ask(get_random(askFacts));}
    }else if(cons[0]==='no'){
      conv.ask(`I don't care. Here's a fact: ${facts[(conv.data.count+1)%facts.length]}.`);
      conv.close('Bye.');
    }
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
