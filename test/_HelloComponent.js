'use strict';

const React = require('react');

module.exports = class Hello extends React.Component {
    render () {
        return React.createElement('div', null, `Hello ${this.props.name}`);
    }
};
