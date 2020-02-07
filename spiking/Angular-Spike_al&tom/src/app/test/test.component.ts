import { Component, OnInit, Injectable } from "@angular/core";
import { WebsocketService } from "../websocket.service";
import { Socket } from "ngx-socket-io";

@Component({
  selector: "app-test",
  template: `
    <h2>Please add your username</h2>
    <input #myInput type="text" />
    <button (click)="logUser(myInput.value)">Log</button>
    {{ "thankyou for your username " }}

    <input #mySession type="text" />
    <button (click)="logSession(mySession.value)">Log</button>
    {{ "thankyou for your session" }}
  `,
  styleUrls: ["./test.component.css"]
})
export class TestComponent implements OnInit {
  public user_name = null;
  public myId = "testId";
  public upvoted = 0;
  public downvoted = 0;

  selectedNumber: Number;

  constructor(private webSocketService: WebsocketService) {}

  ngOnInit() {}

  onClick(event) {
    // here we want to connect to the socketio server

    this.webSocketService.emit("btn click", { votes: event.target.value });

    console.log(event.target.value);
    this.upvoted = event.target.value;
    this.downvoted = event.target.value;
  }

  logUser(value) {
    console.log(value);
    this.webSocketService.emit("user input", { user_name: value });
    this.user_name = value;
    console.log(this.user_name);
  }

  logSession(value) {
    console.log(value);
    this.webSocketService.emit("session input", {
      user_name: this.user_name,
      session: value
    });
  }
}
