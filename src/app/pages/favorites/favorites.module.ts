import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FavoritesRoutingModule } from "./favorites-routing.module";
import { FavoritesComponent } from "./favorites.component";
import { ComponentsModule } from "src/app/core/components/components.module";

@NgModule({
  declarations: [FavoritesComponent],
  imports: [CommonModule, FavoritesRoutingModule, ComponentsModule],
})
export class FavoritesModule {}
