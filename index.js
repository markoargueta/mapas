var express=require('express');
var app=express();
var http=require('http').Server(app);
//Usando socket.io
var io=require('socket.io')(http);

app.use(express.static(__dirname + '/public'));//Aqui se seviran archivos estaticos

var port=process.env.PORT || 3000; //Esto lo exige heroku

app.get('/',function(req, res){
	res.sendFile(__dirname + '/index.html');//Ruta página index.html
});	

http.listen(port,function(){
	console.log('Escuchando en el puerto: ' + port);
});

var socketCount = 0; //Contador de conexiones al server

io.on('connection', function(socket){
	console.log('Usuarios conectado...');
	socketCount++;
	//emitiendo mensaje a TODOS los socketsno usuarios conectados
	io.sockets.emit('usuario conectado', socketCount);
});//cierra conexión

socket.on('disconnect', function(){
	socketCount--;//Decremento del contador
	console.log('Usuario Desconectado');//Mensaje en consola
	io.sockets.emit('usuario desconectado', )//Mensaje a todos los sockets
});