'use strict';

const React = require('react');
const reactDomServer = require('react-dom/server');

function serverRender (src, props, opts) {
    const renderOpts = opts || {};
    const component = eval(src);
    const element = React.createElement(component, props);
    const renderer = renderOpts.static ?
        reactDomServer.renderToStaticMarkup :
        reactDomServer.renderToString;

    return renderer(element);
}

module.exports = function (context, callback) {
    const markup = serverRender(
        context.data.script,
        context.data.props,
        context.data.options
    );
    callback(null, markup);
};
