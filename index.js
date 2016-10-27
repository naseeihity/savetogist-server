var cool = require('cool-ascii-faces');
var oauthshim = require('oauth-shim');
var express = require('express');
var axios = require('axios');
var querystring = require('querystring');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  var id = process.env.CLIENT_ID
  response.render('pages/index',{id:id});
});

app.get('/callback/', function(request, response) {
  var client_id = process.env.CLIENT_ID
  var client_secret = process.env.CLIENT_SECRET
  var code = request.query.code
  var token
  axios.post(
    "https://github.com/login/oauth/access_token",
    {
      code: code,
      client_id: client_id,
      client_secret: client_secret
    }).then(function(res) {
        token = querystring.parse(res.data).access_token
        response.render('pages/token', {token: token})
      })
      .catch(function(err){
        console.log(err)
      })
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/times', function(request, response) {
    var result = ''
    var times = process.env.TIMES || 5
    for (i=0; i < times; i++)
      result += i + ' ';
  response.send(result);
});


app.get('/cool', function(request, response) {
  response.send(cool());
});


