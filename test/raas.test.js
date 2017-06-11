'use strict';

const axios = require('axios');
const test = require('ava');
const child = require('child_process');
const fs = require('fs');
const path = require('path');
const HelloSrc = fs.readFileSync(path.join(__dirname, '_HelloComponent.js'));

function extractWebtaskUrl (text) {
    const match = /(https:\/\/wt-\w+-0.run.webtask.io\/raas-test)/.exec(text);
    return match ? match[0] : '';
}

let webtaskUrl;

test.cb.before((t) => {
    child.exec('wt create -n raas-test --parse-body .', (error, stdout) => {
        if (error) {
            return t.end(error);
        }

        webtaskUrl = extractWebtaskUrl(stdout);
        t.end();
    });
});

test.cb.after.always((t) => {
    child.exec('wt rm raas-test', error => t.end(error));
});

test('renders a component', async (t) => {
    const response = await axios.post(webtaskUrl, {
        script: HelloSrc.toString(),
        props: {
            name: 'world'
        }
    });

    t.is(response.data, '<div data-reactroot="" data-reactid="1" data-react-checksum="1022694294">Hello world</div>');
});

test('renders static markup', async (t) => {
    const response = await axios.post(webtaskUrl, {
        script: HelloSrc.toString(),
        props: {
            name: 'world'
        },
        options: {
            static: true
        }
    });
    t.is(response.data, '<div>Hello world</div>');
});

