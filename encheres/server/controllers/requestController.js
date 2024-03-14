import * as fs from 'fs/promises';

import { getContentTypeFrom }  from '../scripts/contentTypeUtil.js';

const BASE = 'http://localhost/';
/**
*  define a controller to retrieve static resources
*/
export default class RequestController {

  #request;
  #response;
  #url;

  constructor(request, response) {
    this.#request = request,
    this.#response = response;
    this.#url = new URL(this.request.url,BASE).pathname;   // on ne considère que le "pathname" de l'URL de la requête
  }

  get response() {
    return this.#response;
  }
  get request() {
    return this.#request;
  }
  get url() {
    return this.#url;
  }

  async handleRequest() {
    this.response.setHeader("Content-Type" , getContentTypeFrom(this.url) );
    await this.buildResponse();
    this.response.end();
  }

  /**
  * send the requested resource as it is, if it exists, else responds with a 404
  */
  async buildResponse() {
    try {
        let filePath = '../public'; // Chemin de base vers le dossier public
        switch(this.url) {
            case '/':
                filePath += '/html/index.html';
                break;
            case '/bidder':
                filePath += '/bidder.html';
                break;
            case '/auctioneer':
                filePath += '/auctioneer.html';
                break;
              case '/about':
                filePath += '/html/about.html';
                break;
            default:
                // Gestion des fichiers statiques (par exemple, CSS)
                filePath += this.url;
                break;
        }

        await fs.access(filePath);
        const data = await fs.readFile(filePath);
        this.response.statusCode = 200;
        // Définir le Content-Type en fonction de l'extension du fichier
        const contentType = getContentTypeFrom(this.url);
        this.response.setHeader('Content-Type', contentType);
        this.response.write(data);
    } catch(err) {
        this.response.statusCode = 404;
        this.response.write('404 Not Found');
    }
}

}
