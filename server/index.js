var express = require('express');
var https = require('https');
var fs = require('fs');
var readlineSync = require('readline-sync');
var telegramLink = require('telegram.link')();
var app = express();

//node_modules
app.use(express.static('node_modules'));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.get('/connect', function (req, res) {
  res.send({'response' : telegramLink});
});

var server = https.createServer({
    key: fs.readFileSync('ssl/key.pem'),
    cert: fs.readFileSync('ssl/ssl.crt')
}, app).listen(3000);

var data = {}

/* Connect client (not user) to telegram servers */
var connected = function(ex){
  if(!ex){
    var answer = readlineSync.question('Connected, create authKey?');
    var ans = answer.toString().trim();
    if(ans=='yes' || ans=='y'){
      data.client.createAuthKey(keyCreated);
    }
  }
};

/* Create the auth key to communicate with server */
var keyCreated = function(response){
  if(response.error) { console.log('Fucked up: ',error); return }
  data.authKey = response.key;
  data.phone = readlineSync.question('Key created, enter mobile phone to send auth code:');
  data.client.auth.sendCode(
    data.phone,
    5,
    'en',
    codeResponse
  ); 
}

/* Get the code hash to sing in a user */
var codeResponse = function(response){
  console.log(response);
  data.codeHash = response.phone_code_hash;
  data.authCode = readlineSync.question('Obtained hash, enter your auth code:');
  if(response.phone_registered){
    data.client.auth.signIn(data.phone, data.codeHash, data.authCode, signed);
  }
  else{
    data.firstName = readlineSync.question('Enter your first name:');
    data.lastName = readlineSync.question('Enter your last name:');
    data.client.auth.signUp(data.phone, data.codeHash, data.authCode, data.firstName, data.lastName, signed);
  }  
}

var signed = function(response){
  console.log('Signed');
  data.client.messages.getDialogs(0,0,10, dialogsResponse);
}

var dialogsResponse = function(response){
  console.log('respuesta:',response);
}
  
/* Connect client (not user) to telegram servers */
data.client = telegramLink.createClient(
  {/* TEST id and hash change to your app credentials */
    id: 10534,
    hash: '844584f2b1fd2daecee726166dcc1ef8',
    version: '1.0.0',
    lang: 'en'
  },
  telegramLink.TEST_PRIMARY_DC,
  connected
);


