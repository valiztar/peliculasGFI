import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BackendInterceptor } from "./core/interceptors/backend.interceptor";

import { StorageModule } from "@ngx-pwa/local-storage";
import { ComponentsModule } from "./core/components/components.module";
import { HeaderComponent } from "./core/components/header/header.component";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    StorageModule.forRoot({
      IDBNoWrap: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BackendInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
