import { Component } from "@angular/core";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  // user = { name: "" };
  user: any;
  subscription: Subscription;

  constructor() {
    // let sess = localStorage.getItem("currentUser");
    // if (sess) {
    //   // console.log(sess)
    //   // this.user = JSON.parse(sess);
    //   this.user = sess;
    // }
  }

  ngOnInit() {
    // this.subscription = this.auth.user.subscribe(user => {
    //   this.user = user;
    //   // console.log(user);
    // });
  }

  logOut() {
    // this.auth.logout();
  }
}
