let restify = require('restify');
let builder = require("botbuilder");

const connector = new builder.ChatConnector();

var bot = new builder.UniversalBot(connector);

const server = restify.createServer();
server.post('api/messages', connector.listen());

server.listen(process.env.port || process.env.PORT || 3978, '::', () => {
    console.log('Server Up');
});

/* bot.dialog('/', function(session){
    session.send('Hello World');
}); */

bot.dialog('/', [ 
    function(session){
        session.beginDialog('/askName');
    },
    function (session,results) {
        session.send('Hello %s!', results.response);
    }
]);

bot.dialog('/askName', [ 
    function(session){
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function(session, results){
        session.endDialogWithResult(results);
    }
]);
