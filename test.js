const http = require("http"); // creating http server

const webSocketServer = require("websocket").server; //creating websocket server this will give a class which contains all the events

let connection = null;
let count = 1000;
const httpserver = http.createServer((req, res) =>{
    console.log("we have received a request");
})

const websocket = new webSocketServer({ //It takes the JSON. 
    "httpServer" : httpserver           //we have to pass httpserver object to it. Its just the handshake part. httpserver has the socket for the TCP connection
})

websocket.on("request", request=>{
    //console.log("hello");
    connection = request.accept(null, request.origin);
    connection.on("open", ()=> console.log("Opened"));
    connection.on("close", ()=> console.log("closed"));
    connection.on("message", message=>{                             // this method is called when we call ws.send from the client
        //console.log(`received message ${message.utf8Data}`);
        
        //connection.send("Hello client!!");
    }) 
    var x = setInterval(function(){
        console.log(count);
        connection.send(count);
        count-=1;
        if(count<0){
            clearInterval(x);
        }
    },1000)
})

httpserver.listen(8230, () => console.log("My server is listening 8230"));