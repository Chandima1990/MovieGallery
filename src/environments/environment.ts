// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'movie-gallery-58ff2',
    appId: '1:180606836879:web:32798c9a720d6499f090fa',
    storageBucket: 'movie-gallery-58ff2.appspot.com',
    apiKey: 'AIzaSyAGnIyy1R_r0xWtZBLwVR_HaFXZQHf8ZCU',
    authDomain: 'movie-gallery-58ff2.firebaseapp.com',
    messagingSenderId: '180606836879',
    measurementId: 'G-SCE8812JFV',
  },
  production: false,
  // baseApiUrl: "https://63734ba4348e94729908330a.mockapi.io/api/v1",
  baseApiUrl: "https://api.themoviedb.org/3",
  images:"https://image.tmdb.org/t/p",
  apiKey: "6024041c9647be43e5342be3e33ab5b1",
  imdbBaseUrl: "https://www.imdb.com/title/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
