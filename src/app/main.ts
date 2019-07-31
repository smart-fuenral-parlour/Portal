import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import {enableProdMode} from '@angular/core';
//https://github.com/smart-fuenral-parlour/Portal.git


enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);
