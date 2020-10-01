import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

//Sprite loader for icon component
const __svg__ = { path: 'assets/icons/*.svg', name: 'assets/icons/sprite.svg'};
require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
  