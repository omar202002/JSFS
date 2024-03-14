const socket = io();

const messageAccueil = document.getElementById('message_accueil');
const menuDiv = document.getElementById('menu');
const encheresPossiblesDiv = document.getElementById('encheres_possibles');
const bid10Button = document.getElementById('bid10');
const bid20Button = document.getElementById('bid20');
const bid30Button = document.getElementById('bid30');
const infoItem = document.querySelector('label[for="item"]');
const prix_actuel = document.getElementById('prix_actuel');
const prix = document.getElementById('euros');

this.have_to_wait_for_next_auction = false;

socket.on('ping', () => {
  console.log('ping received for auctioneer.js');
  socket.emit('pong');
  socket.emit('i_want_to_be_a_bidder');
  socket.emit('is_auction_in_progress');
});


socket.on('you_are_bidder', () => {
  console.log('you are bidder');
});


socket.on('bidder_is_not_available', () => {
  console.log('you cannot be bidder');
  messageAccueil.innerHTML = `Vous ne pouvez pas être l'enchérisseur`;
  menuDiv.style.display = 'none';
});


socket.on('item', (item, price) => {
  messageAccueil.innerHTML = `Une nouvelle enchère commence`;
  messageAccueil.style.color = '#d1e7e5'; 
  encheresPossiblesDiv.style.display = 'block';
  infoItem.textContent = 'Mise aux enchères : ' + item
  let sum = parseInt(price);
  prix.textContent = `${sum}`;
});


socket.on('bid', (buttonvalue,price, socketId) => {
  if (this.have_to_wait_for_next_auction) {
    return;
  }
  if (socketId === socket.id) {
    messageAccueil.innerText = `Vous avez fait enchère de + ${parseInt(buttonvalue)}€`;
    prix.textContent = price;
  }
  else {
    console.log(`Nouvelle enchère de + ${price}€`);
    messageAccueil.innerText = `Nouvelle enchère de + ${buttonvalue}`;
    prix.textContent = price;
  }
});


socket.on('stop_auction', (item, price, last_socket) => {
  console.log('Received stop_auction event with last_socket:', last_socket);
  if (this.have_to_wait_for_next_auction) {
    return;
  }
  if (last_socket === socket.id) {
    messageAccueil.innerHTML = `Fin de l'enchère pour ${item} à ${price} | Félicitations, vous avez remporté l'enchère !`;
    messageAccueil.style.color = 'green';
  }
  else {
    messageAccueil.innerHTML = `Fin de l'enchère pour ${item} à ${price}`;
  }
  encheresPossiblesDiv.style.display = 'none';
});

socket.on('auction_ended', (message) => {
  console.log('Received auction_ended event:', message);
  messageAccueil.innerHTML = message;
  encheresPossiblesDiv.style.display = 'block';
});

socket.on('wait_for_next_auction', () => {
  console.log('wait for next auction');
  messageAccueil.innerHTML = `Veuillez attendre la prochaine enchère`;
  menuDiv.style.display = 'none';
  this.have_to_wait_for_next_auction = true;
});

// Nouvel écouteur ajouté pour l'événement 'auction_available'
socket.on('auction_available', () => {
  if (this.have_to_wait_for_next_auction) {
    console.log('auction available');
    messageAccueil.innerHTML = `Une nouvelle enchère est disponible`;
    menuDiv.style.display = 'block';
  }
  this.have_to_wait_for_next_auction = false;
});




function handleButtonClick(event) {
  let buttonvalue = event.target.innerText;
  let newprice = parseInt(prix.textContent) + parseInt(buttonvalue);
  if (!buttonvalue) {
    alert('Please enter an item');
    return;
  }
  else {
    socket.emit('bid',buttonvalue, `${newprice}`, socket.id);
  }
}

bid10Button.addEventListener('click', handleButtonClick);
bid20Button.addEventListener('click', handleButtonClick);
bid30Button.addEventListener('click', handleButtonClick);
