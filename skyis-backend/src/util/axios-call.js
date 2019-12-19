const axios = require('axios');
const qs = require('querystring');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');
const request = require('request');

if(process.argv.length < 3) return console.log('NO search param given');
const argvs = process.argv.slice(2);
const queryString = argvs.join(' ');

/**
 * Google 이미지 크롤링을 하는 부분인데,
 * URL을 따서 서버에 저장하는 방식으로 구현이 되어 있다.
 * 이를 적절히 사용해서 상황에 맞게 이용하면 될 것 같다.
 *
 *
 * getImageURL : 이미지 URL 크롤링
 * saveImage : URL 이미지 저장
 */
const getImageURL = async queryString => {    try {
    const res = await axios({
        url: `https://www.google.com/search?q=${qs.escape(queryString)}&tbm=isch`,
        method: 'GET',
        headers: {
            'User-Agent':
                'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:70.0) Gecko/20100101 Firefox/70.0',
        }
    })
    const body = res.data;
    const $ = cheerio.load(body);
    const links = [];
    const meta = $('.rg_meta');
    let cnt = 0;
    meta.each((idx, el) => {
        if(++cnt <= 10) links.push(JSON.parse($(el).text()));

    });
    saveImage(links);
    console.log(links);
} catch (error) {
    console.log(error);
}
    console.log(qs.escape(queryString));

}

const saveImage = links => {
    const folderPath = path.join('/home/ubuntu/skyis/skyis-backend/src/util/images', queryString);
    const regex = /\.(jpe?g|png|tif?f|bmp)/i;
    const urls = links.map(e => e.ou).filter(e => regex.exec(e));
    if(!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }
    console.log(`Images amount: ${urls.length}`);
    var interval = setInterval(() => {
        try {
            const url = urls.shift();
            const options = {
                url,
                headers: {
                    "User-Agent": 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:70.0) Gecko/20100101 Firefox/70.0',
                },
                encoding: null
            }
            let decoded = Object.keys(qs.decode(url))[0];
            let fileName = decoded.split('/')
                .pop()
                .replace(/\s/g, '_')
                .split('?')[0]
            let filePath = path.join(folderPath, fileName);
            request(options, (err, res, body) => {
                if(err) {

                } else {
                    const regex = /image\/.*/;
                    if(regex.exec(res.headers['content-type']) !== null) {
                        fs.writeFile(filePath, body, 'binary', err=> {
                            if(err) console.log(err);
                            else console.log(`Saved ${fileName}`);
                        })
                    }
                }
            })
            if(urls.length === 0) {
                clearInterval(interval);
            }
        } catch(error) {

        }
    }, 500)
}

getImageURL(queryString)


