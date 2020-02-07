import { Component, OnInit } from '@angular/core';
import { WebSocketService } from "../web-socket.service";

@Component({
  selector: "app-public",
  templateUrl: "./public.component.html",
  styleUrls: ["./public.component.css"]
})
export class PublicComponent implements OnInit {
  public upvoted = 0;
  public downvoted = 0;

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {}

  onClick(event) {
    // here we want to connect to the socketio server

    this.webSocketService.emit("btn click", { votes: event.target.value });

    console.log(event.target.value);
    this.upvoted = event.target.value;
    this.downvoted = event.target.value;
  }
}
