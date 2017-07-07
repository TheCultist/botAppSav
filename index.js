let restify = require('restify');
let builder = require("botbuilder");

const connector = new builder.ChatConnector();

var bot = new builder.UniversalBot(connector);

const server = restify.createServer();
server.post('api/messages', connector.listen());

server.listen(process.env.port || process.env.PORT || 3978, '::', () => {
    console.log('Server Up');
});

let address;

function sendProactiveMessage(address){
    var msg = new builder.Message().address(address);
    msg.text("Notification");
    msg.textLocale("en-US");
    bot.send(msg);
}

/* bot.dialog('/', function(session){
    session.send('Hello World');
}); */

bot.dialog('/', [ 
    function(session){
        address = session.message.address;
        session.send("Hi");
        setTimeout(() => {
            sendProactiveMessage(address);
        }, 5000);
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
