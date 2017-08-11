/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      'app': 'app',

      // angular bundles
      '@angular/animations': '@angular/animations/bundles/animations.umd.js',
      '@angular/animations/browser': '@angular/animations/bundles/animations-browser.umd.js',
      '@angular/core': '@angular/core/bundles/core.umd.js',
      '@angular/common': '@angular/common/bundles/common.umd.js',
      '@angular/compiler': '@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': '@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser/animations': '@angular/platform-browser/bundles/platform-browser-animations.umd.js',
      '@angular/platform-browser-dynamic': '@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': '@angular/http/bundles/http.umd.js',
      '@angular/router': '@angular/router/bundles/router.umd.js',
      '@angular/router/upgrade': '@angular/router/bundles/router-upgrade.umd.js',
      '@angular/forms': '@angular/forms/bundles/forms.umd.js',
      '@angular/upgrade': '@angular/upgrade/bundles/upgrade.umd.js',
      '@angular/upgrade/static': '@angular/upgrade/bundles/upgrade-static.umd.js',
      'd3': 'd3/build/d3.min.js',

      // other libraries
      'rxjs':                      'rxjs',
      'angular-in-memory-web-api': 'angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      '/': {
        defaultExtension: 'js',
      },
      app: {
        main: './main.js',
        defaultExtension: 'js',
        meta: {
          './*.js': {
            loader: 'systemjs-angular-loader.js'
          }
        }
      },
      rxjs: {
        defaultExtension: 'js'
      }
    }
  });
})(this);
