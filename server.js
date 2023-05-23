//Importando o módulo express

const express = require('express')();

//Importar o HTTP e atribuir o express como parâmetro e criar um SERVIDOR
const http = require('http').createServer(express);

//Importar o socket.io
const io = require('socket.io')(http);

//Rota para página inicial
express.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));

//Importando a public
const express2 = require('express');
express.use(express2.static('public'));

//Evento para o usuário conectar ao servidor
io.on('connection', (socket) => {
    console.log('Um novo usuário conectou!')

    //Event para o usuário enviar uma mensagem via socket.io
    socket.on('chat message', (dados) => io.emit('chat message', dados));

    //Evento para quando desconectar 
    socket.on('disconnect', () => console.log('Usuário desconectado!'))
})

//Iniciar o servidor na porta 3000
http.listen(3000, () => {
    console.log(`Servidor rodando na porta 300 - Link http://localhost:3000`)
})