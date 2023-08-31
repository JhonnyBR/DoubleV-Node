const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const port = process.env.PORT || 3030;
const mongodb = require('mongoose');
const uri_mongo = 'mongodb://localhost:27017/Double-V-Parteners';
const io = require('socket.io');

async function startServer() {
    try {
        await mongodb.connect(uri_mongo, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Connected to MongoDB');

        const server = app.listen(port, () => {
            console.log('Server started on port ' + port);
        });

        io(server, {
            cors: { origin: "*" }
        }).on('connection', (socket) => {
            console.log('Client Connected!');
            socket.on('Eliminar Cliente', (data) => {
                console.log(data)
            });
            socket.on('Cliente Registrado', (data) => {
                console.log(data)
            });
            socket.on('Cliente Eliminado', (data) => {
                console.log(data)
            });
            socket.on('disconnect', () => {
                console.log('Client disconnected!');
            });
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

startServer();
