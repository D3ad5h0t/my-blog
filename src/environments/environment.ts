// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Enviroment } from "./interface";

export const environment: Enviroment = {

  production: false,

  apiKey: 'AIzaSyCWPp4AjtHSGWi0sOvSs1NctlGsJi7Qmbk',

  fbDbUrl: 'https://my-blog-3b018-default-rtdb.firebaseio.com/'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
