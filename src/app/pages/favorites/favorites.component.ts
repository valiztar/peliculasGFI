import { Component, OnInit } from "@angular/core";
import { ServerSentEventService } from "src/app/core/services/sse.service";
import { FavoritesService } from "src/app/core/services/favorites.service";

@Component({
  selector: "app-favorites",
  templateUrl: "./favorites.component.html",
  styleUrls: ["./favorites.component.scss"],
})
export class FavoritesComponent implements OnInit {
  constructor(private favoritesService: FavoritesService) {}

  movies: Movie[] = [];
  moviesList: Movie[] = [];
  movieDemo = {
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjhiMzgxZTctNDc1Ni00OTIxLTlhMTYtZTA3ZWFkODRkNmE2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    Title: "Breaking Bad",
    Type: "series",
    Year: "2008–2013",
    imdbID: "tt0903747",
  };
  ngOnInit() {
    console.log(this.moviesList);
    this.getMovies();
    console.log(this.moviesList);
    //this.moviesList = this.favoritesService.getFavorites();
  }

  /* addMovies() {
    let movie: Movie = {
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjhiMzgxZTctNDc1Ni00OTIxLTlhMTYtZTA3ZWFkODRkNmE2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
      Title: "Breaking Bad",
      Type: "series",
      Year: "2008–2013",
      imdbID: "tt0903747",
    };
    this.favoritesService.addfavorites(movie);
  } */

  getMovies() {
    this.favoritesService.getFavorites().subscribe((movies: Movie[]) => {
      movies = movies || [];
      this.moviesList = movies;
      console.log(this.moviesList);
    });
  }

  inFavorites(movie: Movie) {
    return this.moviesList.some((f) => f.imdbID === movie.imdbID);
  }
}
