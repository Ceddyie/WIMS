import { Injectable } from '@angular/core';

var SockJs = require("sockjs-client");
var Stomp = require("stompjs");

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  public connect() {
    let socket = new SockJs('http://localhost:8083/socket');
    let stompClient = Stomp.open(socket);
    return stompClient;
  }
}
