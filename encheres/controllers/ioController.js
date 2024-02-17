export default class IOController {

  #io;
  #clients;
  #clientTimers;

  constructor(io) {
    this.#io = io;
    this.#clients = new Map();
    this.#clientTimers = new Map();
  }

  registerSocket(socket) {
    console.log(`new connection with id ${socket.id}`);
    this.setupListeners(socket);
    socket.emit('ping');
    this.startSendingMessages(socket);
  }

  setupListeners(socket) {
    socket.on( 'pong' , () => this.greatings(socket) );
    socket.on( 'disconnect' , () => this.leave(socket) );
  }

  greatings(socket) {
    console.log(`pong received from (id ${socket.id})`);
    this.#clients.set(socket.id);
  }

  leave(socket) {
    const userName = this.#clients.get(socket.id) || 'unknown';
    console.log(`disconnection from ${socket.id} (user ${userName})`);
    clearInterval(this.#clientTimers.get(socket.id));
    this.#clients.delete(socket.id);
    this.#clientTimers.delete(socket.id);
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  startSendingMessages(socket) {
    const timer = setInterval(() => {
      const randomInt = this.getRandomInt(2, 8);
      socket.emit('message', randomInt);
      console.log(`Message sent to client ${socket.id}: ${randomInt}`);
    }, 2000);

    this.#clientTimers.set(socket.id, timer);
  }
}
