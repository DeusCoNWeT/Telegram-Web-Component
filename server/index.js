var telegramLink = require('telegram.link')();

var connected = function(ex){
  if(!ex) { 
    console.log('Connected to Telegram!'); 
    client.createAuthKey(keyCreated);
  }
};

var authKey = null;

var keyCreated = function(response){
  if(response.error) { console.log('Fucked up: ',error); return }
  authKey = response.key;
  console.log('Got the key: ',authKey);

  client.auth.sendCode(
  '34625355635',
  5,
  'en',
  codeResponse
  );
}

var codeResponse = function(response){
  console.log('Code response: ',response);
}

var client = telegramLink.createClient(
  {
    id: 10534,
    hash: '844584f2b1fd2daecee726166dcc1ef8',
    version: '1.0.0',
    lang: 'en'
  },
  telegramLink.TEST_PRIMARY_DC,
  connected
);