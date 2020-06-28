import { Component, OnInit } from "@angular/core";
import { MoviesService } from "src/app/core/services/movies.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"],
})
export class DetailComponent implements OnInit {
  movie: any;
  plot: string = "";
  constructor(private moviesService: MoviesService, private router: Router) {}

  ngOnInit() {
    if (!window.history.state.data) {
      this.router.navigate(["/home"]);
    }
    this.movie = window.history.state.data;
  }

  viewPlot() {
    this.moviesService.getID(this.movie.imdbID).subscribe((fulldata) => {
      this.plot = fulldata.Plot;
    });
  }
}
