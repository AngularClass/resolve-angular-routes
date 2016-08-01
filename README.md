# resolve-angular-routes
Resolve Angular 2 Routes for Context


`npm install --save-dev @angularclass/resolve-angular-routes`

```es6
const resolveNgRoute = require('@angularclass/resolve-angular-routes');
// root helper
module.exports = {
  // etc
  plugins: [
    new ContextReplacementPlugin(
      /angular\/core\/src\/linker/,
      root('./src'),
      resolveNgRoute(root('./src'))
    ),
  ]
  // etc
```
