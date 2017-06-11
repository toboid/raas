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
    if (!context.body.script) {
        return callback('body.script field required');
    }

    let markup;

    try {
        markup = serverRender(context.body.script, context.body.props, context.body.options);
    } catch (ex) {
        return callback('Failed to render component');
    }

    callback(null, markup);
};
