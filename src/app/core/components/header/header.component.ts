import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Input() userName: string;
  @Output() logoutseason = new EventEmitter<void>();

  options = ["home", "favorites"];

  constructor() {}

  ngOnInit() {}

  logout() {
    console.log("click");
    this.logoutseason.emit();
  }
}
