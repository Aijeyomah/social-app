import socketIO from 'socket.io';

class SocketIo {

    constructor(server){
        this.io = socketIO(server);
    }
    
    init(){
        this.io.on('connection', (socket) => {
            console.log('connected', socket);
      

        socket.on('disconnect', () => {
            console.log('A user disconnected');
          });
        });
    } 

    static initialize(io) {
        io.init();
      }
};

export default SocketIo;