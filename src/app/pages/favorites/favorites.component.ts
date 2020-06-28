import { Component, OnInit } from "@angular/core";
import { Observable, interval, Subscription } from "rxjs";
import { FavoritesService } from "src/app/core/services/favorites.service";

@Component({
  selector: "app-favorites",
  templateUrl: "./favorites.component.html",
  styleUrls: ["./favorites.component.scss"],
})
export class FavoritesComponent implements OnInit {
  private updateSubscription: Subscription;

  constructor(private favoritesService: FavoritesService) {}

  movies: Movie[] = [];
  moviesList: Movie[] = [];

  ngOnInit() {
    //this.updateSubscription = interval(1000).subscribe((val) => {
    this.getMovies();
    // });
  }

  getMovies() {
    this.favoritesService.getFavorites().subscribe((movies: Movie[]) => {
      movies = movies || [];
      this.moviesList = movies;
    });
  }

  inFavorites(movie: Movie): boolean {
    return this.moviesList.some((f) => f.imdbID === movie.imdbID);
  }

  refreshList(imdbID) {
    this.moviesList = this.moviesList.filter((f) => f.imdbID != imdbID);
  }
}
