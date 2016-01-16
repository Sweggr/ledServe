/*
			ledServe

	Hosts web frontend for Raspberry Pi RGB LEDs
	with a simple Express router and Socket.IO
	for communication.

	Uses pi-blaster daemon for emitting PWM signals
	to RPi GPIO controllable via pi-blaster node module.

		Seglectic Softworks 2016
*/


/*
	Setup express for web hosting 
*/
var express = require('express');
var app = express();	 							//Make express instance
app.use(express.static(__dirname + '/public'));		//Static file routing
var port = 9000;		 							//Define a port
var server = app.listen(port,function(){			//Start server instance from express.
	console.log("Server started on port",port);
});


/*
	Setup socket.io for client communication
*/
var http = require('http').Server(express);
var io = require('socket.io')(http);


/*
	RGB COMMS
*/
io.on('connection',function(sock){
	console.log('CLIENT CONNECTED.');

	sock.on('disconnect',function(){
		console.log('CLIENT DISCONNECTED');
	});

	sock.on('ledCLR',function(clr){
		clr = clr.split(' ');
		console.log(clr)
	});

});




http.listen(9001);