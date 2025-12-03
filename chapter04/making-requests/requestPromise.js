import { get } from 'node:https';

function httpGet (url) {
    return new Promise((resolve, reject) => {
        get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve(data);
            });
        })
        .on('error', (err) => {
            reject(err);
        });
    });
}

const run = async () => {
    const res = await httpGet('https://example.com');
    console.log(res);
};

run();