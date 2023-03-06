const http = require("http"); // creating http server
const app = require("express")();
app.listen(9091, ()=>console.log("listening on http port 9091"));
app.get("/",(req,res)=> res.sendFile(_dirname+"/index.html"));

const webSocketServer = require("websocket").server; //creating websocket server this will give a class which contains all the events

let connection = null;
let count = 300;
const httpserver = http.createServer((req, res) =>{
    console.log("we have received a request");
})
httpserver.listen(8230, () => console.log("My server is listening 8230"));
const clients = {};
const clientarry=[];
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
        
        connection.send("Hello client!!");
        //sendevery3sec();
    }) 

    const clientId = guid(); 
    clients[clientId] = {
        "connection" : connection
    }
    clientarry.push(clientId);
    const payload ={
        "method": "connect",
        "clientId": clientId
    }
    //connection.send(JSON.stringify(payload));
    
    sendevery3sec();
})



function guid() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  var x = setInterval(function(){
    console.log(count);
    
    count-=1;
    if(count<=0){
        count=300;
        //clearInterval(x);
    }
},1000);

function sendevery3sec(){
    let min = parseInt(count/60);
    let sec = count%60;
    const payload ={
        "method": "countdown",
        "count": min+":"+sec
    }
    clientarry.forEach(function(item){
        clients[item].connection.send(JSON.stringify(payload));
    })
    //connection.send(count);
    if(count<0)
        return;
    setTimeout(sendevery3sec,1000);
}
  