var fs = require('fs');
var path = require('path');

function routesResolver(filePath) {
  var ngModule = require(filePath).default;
  var file = require(filePath);
  var ngRoutes = ngModule.routes ||
                     file.routes ||
          ngModule.ROUTER_CONFIG ||
              file.ROUTER_CONFIG ||
           ngModule.ROUTE_CONFIG ||
               file.ROUTE_CONFIG ||
                                 [];
  return ngRoutes;
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
          var filePath = route.component || route.loadChildren;
          return filePath && typeof route.component === 'string';
        })
        .map(function(route) {
          var filePath = route.component || route.loadChildren;
          return filePath.split('#')[0]
        })
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
