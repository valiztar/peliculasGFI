import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "home",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./pages/home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "favorites",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./pages/favorites/favorites.module").then(
        (m) => m.FavoritesModule
      ),
  },
  {
    path: "detail",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./pages/detail/detail.module").then((m) => m.DetailModule),
  },
  {
    path: "**",
    redirectTo: "login",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
