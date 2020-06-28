import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { StorageMap } from "@ngx-pwa/local-storage";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  baseURL = environment.baseURL;

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private storage: StorageMap) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(username, password) {
    return this.http
      .post<any>(`${this.baseURL}/users/authenticate`, { username, password })
      .pipe(
        map((user) => {
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    this.storage.clear();
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }
}
