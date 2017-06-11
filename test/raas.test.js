'use strict';

const axios = require('axios');
const test = require('ava');
const {exec} = require('child_process');

function extractWebtaskUrl (text) {
    const match = /(https:\/\/wt-\w+-0.run.webtask.io\/raas-test)/.exec(text);
    return match ? match[0] : '';
}

let webtaskUrl;

test.cb.before((t) => {
    exec('wt create -n raas-test -b .', (error, stdout) => {
        if (error) {
            return t.end(error);
        }

        webtaskUrl = extractWebtaskUrl(stdout);
        t.end();
    });
});

test.cb.after.always((t) => {
    exec('wt rm raas-test', error => t.end(error));
});

test('raas returns hello world', async (t) => {
    const response = await axios.get(webtaskUrl);
    t.is(response.data, 'Hello world');
});
