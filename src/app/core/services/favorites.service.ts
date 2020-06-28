import { Injectable } from "@angular/core";
import { StorageMap } from "@ngx-pwa/local-storage";

@Injectable({
  providedIn: "root",
})
export class FavoritesService {
  constructor(private storage: StorageMap) {}

  addfavorites(movie: Movie): void {
    //console.log(movie);
    this.storage.get<Movie[]>("favoriteMovies").subscribe((movies: Movie[]) => {
      movies = movies || [];
      movies.push(movie);
      //console.log(movies);
      this.storage.set("favoriteMovies", movies).subscribe(() => {
        this.getFavoritesConosle();
      });
    });
  }

  removeFavorite(movie: Movie): void {
    //console.log(movie);
    this.storage.get<Movie[]>("favoriteMovies").subscribe((movies: Movie[]) => {
      movies = movies || [];
      movies = movies.filter((movieLS) => movieLS.imdbID != movie.imdbID);
      //console.log(movies);
      this.storage.set("favoriteMovies", movies).subscribe(() => {
        this.getFavoritesConosle();
      });
    });
  }

  getFavorites() {
    return this.storage.get("favoriteMovies");
  }
  getFavoritesConosle() {
    return this.storage.get("favoriteMovies").subscribe((r) => {
      console.log("infavorites:", r);
    });
  }
}
