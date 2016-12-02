var express = require('express');
var telegramLink = require('telegram.link')();
var app = express();

//node_modules
app.use(express.static('node_modules'));

app.listen(3000);

/* Connect client (not user) to telegram servers */
var connected = function(ex){
  if(!ex) { 
    console.log('Connected to Telegram!'); 
    client.createAuthKey(keyCreated);
  }
};

var authKey = null;

/* Create the auth key to communicate with server */
var keyCreated = function(response){
  if(response.error) { console.log('Fucked up: ',error); return }
  authKey = response.key;
  console.log('Got the key: ',authKey);

  /* Send the auth code to the user phone */
  client.auth.sendCode(
  '666666666',
  5,
  'en',
  codeResponse
  );
}

/* Get the code hash to sing in a user */
var codeResponse = function(response){
  console.log('Code response: ',response);
}

/* Connect client (not user) to telegram servers */
var client = telegramLink.createClient(
  {/* TEST id and hash change to your app credentials on deploy */
    id: 10534,
    hash: '844584f2b1fd2daecee726166dcc1ef8',
    version: '1.0.0',
    lang: 'en'
  },
  telegramLink.TEST_PRIMARY_DC,
  connected
);