var fs = require('fs');
var path = require('path');

function routesResolver(filePath) {
  var file;
  var ngModule;
  var ngRoutes = [];

  try {
    file = require(filePath);
    ngModule = file && file.default || {};
    ngRoutes = ngModule.routes ||
                       file.routes ||
            ngModule.ROUTER_CONFIG ||
                file.ROUTER_CONFIG ||
             ngModule.ROUTE_CONFIG ||
                 file.ROUTE_CONFIG ||
                                   [];
  } catch (e) {
    console.warn('ResolveNgRoutes', filePath)
  }
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
          return typeof filePath === 'string';
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
