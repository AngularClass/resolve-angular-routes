var fs = require('fs');
var path = require('path');

function routesResolver(filePath) {
  var ngModule = require(filePath).default || require(filePath);
  var routes = ngModule.routes || require(filePath).routes || [];
  return routes;
}

function resolveNgRoute(srcPath, config, defaultFile, resolver) {
  config = config || {};
  resolver = resolver || routesResolver;
  defaultFile = defaultFile || 'index.ts';
  fs.readdirSync(srcPath)
    .filter(function(file) {
      var filePath = path.join(srcPath, file);
      return fs.statSync(filePath).isDirectory() || file === defaultFile;
    })
    .map(function(file) {
      var filePath = path.join(srcPath, file);
      if (fs.statSync(filePath).isDirectory()) {
        return resolveNgRoute(filePath, config, defaultFile, resolver);
      }
      resolver(filePath)
        .filter(function(route) {
          return (route.component && typeof route.component === 'string') || (route.loadChildren && typeof route.loadChildren === 'string');
        })
        .map(function(route) { return (route.component || route.loadChildren).split('#')[0] })
        .map(function(componentPath) {
          //  create context map
          config[componentPath] = path.join(srcPath, componentPath);
        });
      // return filePath;
    });
  return config;
}
resolveNgRoute.default = resolveNgRoute
resolveNgRoute.resolveNgRoute = resolveNgRoute;

module.exports = resolveNgRoute;
