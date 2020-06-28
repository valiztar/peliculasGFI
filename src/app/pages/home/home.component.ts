import { Component, OnInit } from "@angular/core";
import { MoviesService } from "src/app/core/services/movies.service";
import { FormGroup, FormBuilder } from "@angular/forms";
import { FavoritesService } from "src/app/core/services/favorites.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  searchForm: FormGroup;

  movies: Movie[] = [];
  favoriteList: Movie[] = [];

  constructor(
    private moviesService: MoviesService,
    private formBuilder: FormBuilder,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: [""],
    });
    this.favoritesService.getFavorites().subscribe((movies: Movie[]) => {
      movies = movies || [];
      this.favoriteList = movies;
    });

    this.searchForm.controls["search"].valueChanges
      .pipe()
      .subscribe((value: string) => {
        if (value.length > 2) this.search(value);
        else this.movies = [];
      });
  }

  get searchInput() {
    return this.searchForm.controls["search"];
  }

  search(keyword: string) {
    this.moviesService.getSearch(keyword).subscribe((movies) => {
      if (movies.Search) this.movies = movies.Search;
      else this.movies = [];
    });
  }

  inFavorites(movie: Movie) {
    return this.favoriteList.some((f) => f.imdbID === movie.imdbID);
  }
}
