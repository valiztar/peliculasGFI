import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { FavoritesService } from "../../services/favorites.service";

@Component({
  selector: "app-postercard",
  templateUrl: "./postercard.component.html",
  styleUrls: ["./postercard.component.scss"],
})
export class PostercardComponent implements OnInit {
  @Input() movie: any;
  @Input() inFavorites: any;

  constructor(
    private router: Router,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {}

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
  }
}
