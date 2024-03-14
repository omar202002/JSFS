export default class IOController {

  #io;
  #clients;
  constructor(io) {
    this.#io = io;
    this.#clients = new Map();
    this.auctioneerSocketId = null;
    this.auctionInProgress = false;
  }

  registerSocket(socket) {
    console.log(`new connection with id ${socket.id}`);
    this.setupListeners(socket);
    socket.emit('ping');
    if (this.auctionInProgress) {
      socket.emit('wait_for_next_auction');
    } else {
      socket.emit('auction_available');
    }
  }

  setupListeners(socket) {
    socket.on( 'pong' , () => this.greatings(socket) );
    socket.on( 'i_want_to_be_auctionner' , () => this.is_auctionner_available(socket) );
    socket.on( 'start_auction' , (item, price) => this.start_auction(item, price) );
    socket.on( 'stop_auction' , (item, price, last_socket) => this.stop_auction(item, price, last_socket) );
    socket.on( 'bid' , (buttonvalue,price, socketid) => this.bid_to_auctioneer(buttonvalue,price, socketid) );
    socket.on('is_auction_in_progress', () => this.is_auction_in_progress(socket));
    socket.on( 'disconnect' , () => this.leave(socket) );
  }

  greatings(socket) {
    console.log(`pong received from (id ${socket.id})`);
    this.#clients.set(socket.id);
  }

  is_auctionner_available(socket) {
    if (this.auctioneerSocketId === null) {
      socket.emit('you_are_auctionner');
      this.auctioneerSocketId = socket.id;
    }
    else {
      socket.emit('auctionner_is_not_available');
    }
  }

  bid_to_auctioneer(buttonvalue,price, socket) {
    console.log(`bid to auctioneer ${price}`);
    this.#io.emit('bid',buttonvalue, price, socket);
  }

  start_auction(item, price, last_socket) {
    console.log(`start auction for ${item} at ${price}`);
    this.#io.emit('item', item, price, last_socket);
    this.auctionInProgress = true;
  }

  stop_auction(item, price , last_socket) {
    console.log(`stop auction for ${item} at ${price} with last_socket ${last_socket}`);
    this.#io.emit('stop_auction', item, price, last_socket);
    this.auctionInProgress = false;
    this.#io.emit('auction_available');
  }

  is_auction_in_progress(socket) {
    if (this.auctionInProgress) {
      socket.emit('wait_for_next_auction');
    } else {
      socket.emit('auction_available');
    }
  }

  leave(socket) {
    const userName = this.#clients.get(socket.id) || 'unknown';
    console.log(`disconnection from ${socket.id} (user ${userName})`);
    if (socket.id === this.auctioneerSocketId) {
      this.#io.emit('auction_ended', 'Le commissaire-priseur s\'est déconnecté');
      this.auctioneerSocketId = null;
    }
    this.#clients.delete(socket.id);
  }


}
