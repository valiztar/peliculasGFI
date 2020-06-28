import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { environment } from "src/environments/environment";

let usersData = [
  {
    id: 1,
    firstName: "David",
    lastName: "Mahecha",
    username: "gfi",
    password: "123",
  },
];
@Injectable()
export class BackendInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, body } = request;

    if (
      method === "POST" &&
      url === `${environment.baseURL}/users/authenticate`
    ) {
      return authenticate();
    } else {
      return next.handle(request);
    }

    function authenticate() {
      const { username, password } = body;
      const user = usersData.find(
        (x) => x.username === username && x.password === password
      );
      if (!user)
        return throwError({
          error:
            "Username or password is incorrect retry with Username=gfi and password=123",
        });
      return of(
        new HttpResponse({
          status: 200,
          body: {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            token: "fake-jwt-token",
          },
        })
      );
    }
  }
}
