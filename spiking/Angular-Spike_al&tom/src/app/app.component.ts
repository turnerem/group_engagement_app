import { Component, OnInit } from "@angular/core";
import { WebsocketService } from "./websocket.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "angular-websocket-spiking";

  constructor(private webSocketService: WebsocketService) {}

  ngOnInit() {
    // here we want to connect to the socketio server

    this.webSocketService.listen("test event").subscribe(data => {
      console.log(data, "data logged");
    });
  }
}
