import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class MoviesService {
  baseURL = `http://www.omdbapi.com/?apikey=${environment.apiKey}&`;

  constructor(private http: HttpClient) {}

  getSearch(search) {
    return this.http
      .get<any>(`${this.baseURL}s=${search}`)
      .pipe(map((movies) => movies));
  }
  getID(id) {
    return this.http
      .get<any>(`${this.baseURL}i=${id}`)
      .pipe(map((movie) => movie));
  }
}
