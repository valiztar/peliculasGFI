import { NgModule } from "@angular/core";

import { PostercardComponent } from "src/app/core/components/postercard/postercard.component";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [CommonModule],
  exports: [PostercardComponent],
  declarations: [PostercardComponent],
})
export class ComponentsModule {}
