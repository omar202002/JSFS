const socket = io();

let last_auctioneerid = null;

const messageAccueil = document.getElementById('message_accueil');
const itemInput = document.getElementById('item');
const priceInput = document.getElementById('price');
const montantLabel = document.getElementById('montant');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const menuDiv = document.getElementById('menu');

socket.on('ping', () => {
  console.log('ping received for auctioneer.js');
  socket.emit('pong');
  socket.emit('i_want_to_be_auctionner');
});

socket.on('you_are_auctionner', () => {
  console.log('you are auctionner');
});

socket.on('auctionner_is_not_available', () => {
  console.log('you cannot be auctionner');
  messageAccueil.innerHTML = `Vous ne pouvez pas être commissaire-priseur car un autre commissaire-priseur est déjà en place`;
  messageAccueil.style.color = 'red'; 
  menuDiv.style.display = 'none';
});

socket.on('bid', (buttonvalue, price, socketid) => {
  console.log(`Nouvelle enchère de + ${price}€`);
  console.log(`Nouvelle enchère de + ${socketid}`);
  messageAccueil.innerHTML = `Nouvelle enchère reçue de ${socketid} : + ${buttonvalue}`;
  montantLabel.innerHTML = `Montant actuel enchère de + ${price}€`;
  last_auctioneerid = socketid;
});




startButton.addEventListener('click', () =>
{
  const item = itemInput.value;
  const price = priceInput.value;
  if (!item) {
    alert('Please enter an item');
    return;
  }
  else {
    socket.emit('start_auction', item, price);
    messageAccueil.innerHTML = `Début de l'enchère pour ${item} à ${price}€`;
    startButton.disabled = true;
  }
});

stopButton.addEventListener('click', () =>
{
  socket.emit('stop_auction', itemInput.value, priceInput.value, last_auctioneerid);
  messageAccueil.innerHTML = `Fin de l'enchère`;
  startButton.disabled = false;
  
});