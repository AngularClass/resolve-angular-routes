<p align="center">
  <a href="http://courses.angularclass.com/courses/angular-2-fundamentals" target="_blank">
    <img width="438" alt="Angular 2 Fundamentals" src="https://cloud.githubusercontent.com/assets/1016365/17200649/085798c6-543c-11e6-8ad0-2484f0641624.png">
  </a>
</p>

___

# resolve-angular-routes
Resolve Angular 2 Routes for Context

`npm install --save-dev @angularclass/resolve-angular-routes`


```
src/
 ├──about/
 |    └──index.ts  // NgModule or Component with either
 |
 └──index.ts // routes

// the router resolve will look for these static properties
// 'routes', 'ROUTER_CONFIG', or 'ROUTE_CONFIG'

// ngRoutes from index.ts
[
  { path: 'about', component: './about' }
]

// context map created
{
  './about': './app/about'
}
```

```es6
import 'core-js/es6';
import 'core-js/es7/reflect';

const resolveNgRoute = require('@angularclass/resolve-angular-routes');

module.exports = {
  // etc
  plugins: [
    new ContextReplacementPlugin(
      /angular\/core\/src\/linker/,
      root('./src'), // root() __dirname helper
      resolveNgRoute(root('./src'))
    ),
  ]
  // etc
}
```

___

enjoy — **AngularClass**

<br><br>

[![AngularClass](https://cloud.githubusercontent.com/assets/1016365/9863770/cb0620fc-5af7-11e5-89df-d4b0b2cdfc43.png  "Angular Class")](https://angularclass.com)
##[AngularClass](https://angularclass.com)
> Learn AngularJS, Angular 2, and Modern Web Development from the best.
> Looking for corporate Angular training, want to host us, or Angular consulting? patrick@angularclass.com

___

Apache-2.0
