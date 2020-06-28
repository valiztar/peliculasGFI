import { Injectable } from "@angular/core";
import { StorageMap } from "@ngx-pwa/local-storage";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FavoritesService {
  constructor(private storage: StorageMap) {}

  addfavorites(movie: Movie): void {
    this.storage.get<Movie[]>("favoriteMovies").subscribe((movies: Movie[]) => {
      movies = movies || [];
      movies.push(movie);
      this.storage.set("favoriteMovies", movies).subscribe(() => {});
    });
  }

  removeFavorite(movie: Movie): void {
    this.storage.get<Movie[]>("favoriteMovies").subscribe((movies: Movie[]) => {
      movies = movies || [];
      movies = movies.filter((movieLS) => movieLS.imdbID != movie.imdbID);
      this.storage.set("favoriteMovies", movies).subscribe(() => {});
    });
  }

  getFavorites(): Observable<any> {
    return this.storage.get("favoriteMovies");
  }
}
