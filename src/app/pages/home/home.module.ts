import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "src/app/core/components/components.module";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
})
export class HomeModule {}
