# RAAS
**R**ender **a**s **a** **s**ervice for react components.

This webtask takes the source for a react component and some props, it renders the component and returns the markup to the client. This is useful for server-side rendering in server environments that don't support JavaScript.

# API
The task expects the following fields to be in the http request post body:
* `script: string` - this is the source of a common.js module as a string. The default export of the module must be a React component.
* `props: object` - props to pass to the component to be rendered.
* `options: {static: boolean}`
  * `options.static` if set to true component will be rendered as static markup using `renderToStaticMarkup`. Defaults to false.
  
See [the tests](https://github.com/toboid/raas/blob/master/test/raas.test.js#L43-L54) for example usage.

# Limitations
This solution is currently only suitable for single-tenanted use as it executes arbitrary code supplied in the request. However it could be modified to work so that the rendering code is also supplied as part of the request and each tenant uses there own container as described in [WebTask as a Code Sandbox](https://webtask.io/docs/sample_multitenant).

# Further work
* Pass url instead of the inlining the module source in the request. This would facilitate caching of compiled components and reduce request size.
* Allow the client to request a named export of the common.js module. This would allow selection of components to render from a bundle of multiple components which could be held in cache and be able to refer to each other.
* This task does not currently work with wt-cli's bundling. This is because the task uses `react-dom/server` and the bundling functionality adds it to the bundle as well as including installing it in the container (I have created an issue in the wt-cli repos). Using bundling would allow the rendering code to be moved to it's own file and tested without being wrapped in a webtask.
