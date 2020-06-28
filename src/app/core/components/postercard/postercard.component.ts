import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { FavoritesService } from "../../services/favorites.service";

@Component({
  selector: "app-postercard",
  templateUrl: "./postercard.component.html",
  styleUrls: ["./postercard.component.scss"],
})
export class PostercardComponent {
  @Input() movie: Movie;
  @Input() inFavorites: boolean;

  @Output() refreshList = new EventEmitter<string>();

  constructor(
    private router: Router,
    private favoritesService: FavoritesService
  ) {}

  viewDetail() {
    this.router.navigate(["/detail"], { state: { data: this.movie } });
  }

  addFavorites() {
    this.favoritesService.addfavorites(this.movie);
    this.inFavorites = !this.inFavorites;
  }
  removeFavorites() {
    this.favoritesService.removeFavorite(this.movie);
    this.inFavorites = !this.inFavorites;

    if (this.refreshList) this.refreshList.emit(this.movie.imdbID);
  }
}
