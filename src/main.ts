///<reference path="../node_modules/@angular/core/src/application_ref.d.ts"/>
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);

if (environment.production) {
  enableProdMode();
}
