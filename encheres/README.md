# Projet d'enchères

## Auteur : Omar KODE OUSMANE

## Description

Le but de ce projet est de créer un site web d'enchères.
Arrivé sur la page d'accueil, trois liens sont proposés :
- Un lien pour le commissaire-priseur
- Un lien pour les enchérisseurs
- Un lien pour en savoir plus sur le projet

## Description des rôles

### Commissaire-priseur
Le commissaire-priseur est la personne qui met en vente un objet. Il doit remplir un formulaire avec le nom, la description et le prix de départ de l'objet. Une fois le formulaire soumis, l'objet est mis en vente et les enchérisseurs peuvent enchérir dessus. Il ne peut y avoir qu'un seul commissaire-priseur à la fois.
Si un client veut etre commissaire-priseur, il doit attendre que le commissaire-priseur actuel se retire.

### Enchérisseur
L'enchérisseur est la personne qui participe à une vente aux enchères. Il doit entrer le prix de son offre dans un champ et cliquer sur un bouton pour enchérir.
Si une enchère est en cours et qu'un client veut enchérir, il doit attendre que l'enchère actuelle se termine.

### En savoir plus
Donne des informations sur le site web.

## Installation

### Dans le dossier client

- Installer les dépendances avec la commande `npm install`
- Exécuter ensuite la commande `npm run build` pour compiler le code

### Dans le dossier server

- Installer les dépendances avec la commande `npm install`
- Instiller le package `nodemon` avec la commande `npm install nodemon`
- Exécuter ensuite la commande 'npm install socket.io' pour installer le package `socket.io`
- Exécuter ensuite la commande `nodemon ` pour lancer le serveur


## Accès au site web

- Pour accéder à la page d'accueil, se rendre sur la page `http://localhost:8080/`
- Pour accéder à la page du commissaire-priseur, se rendre sur la page `http://localhost:8080/auctioneer`
- Pour accéder à la page des enchérisseurs, se rendre sur la page `http://localhost:8080/bidder`
- Pour accéder à la page d'informations, se rendre sur la page `http://localhost:8080/about`

## Sites web utilisés pour l'inspiration du design

- `https://freefrontend.com/`


## Structure du projet

```
encheres
├── client
│   ├── html
│   │   ├── about.html
│   │   ├── index.html
│   ├── images
│   │   ├── background_body.jpg
│   │   ├── h1.png
│   │   ├── law.png
│   │   ├── star.png
│   ├── scripts
│   │   ├── auctioneer.js
│   │   ├── bidder.js
│   │   ├── index.js
│   ├── styles
│   │   ├── style.css
│   ├── auctioneer.html
│   ├── bidder.html
│   ├── package-lock.json
│   ├── package.json
│   ├── webpack.config.js
├── server
│   ├── controllers
│   │   ├── ioController.js
│   │   ├── requestController.js
│   ├── scripts
│   │   ├── contentTypeUtil.js
│   ├── main.js
│   ├── package-lock.json
│   ├── package.json
├── package-lock.json
├── package.json
├── README.md
```

