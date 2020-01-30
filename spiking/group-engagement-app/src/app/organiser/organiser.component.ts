import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";

@Component({
  selector: "app-organiser",
  templateUrl: "./organiser.component.html",
  styleUrls: ["./organiser.component.css"]
})
export class OrganiserComponent implements OnInit {
  constructor(private _dataService: DataService) {}

  data = {};

  ngOnInit() {
    this._dataService.getData().subscribe(res => console.log
      (this.data = res));
  }
}
