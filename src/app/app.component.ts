import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "./core/services/authentication.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  title = "testgfi";
  islogin = false;
  userName: string = "";
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe((user) => {
      if (user) {
        this.userName = `${user.firstName} ${user.lastName}`;
        this.islogin = true;
      }
    });
  }

  logoutseason() {
    this.islogin = false;
    this.userName = "";
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
}
