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
  async buildResponse()  {
    try {
      let data;
      switch (this.url) {
        case '/':
          // check if resource is available
          await fs.access('./public/index.html');
          // read the requested resource content
          data = await fs.readFile('./public/index.html');
          break;
        case '/auctioneer':
          await fs.access('./public/html/auctioneer.html');
          data = await fs.readFile('./public/html/auctioneer.html');
          break;
        case '/bidder':
          await fs.access('./public/html/bidder.html');
          data = await fs.readFile('./public/html/bidder.html');
          break;
        case '/about':
          await fs.access('./public/html/about.html');
          data = await fs.readFile('./public/html/about.html');
        break;
        default:
          throw new Error('Route not found');
      }
      // send the requested resource
      this.response.statusCode = 200;
      this.response.write(data);
    }
    catch(err) { // resource is not available
      this.response.statusCode = 404;
      this.response.write('erreur');
    }
  }

}
