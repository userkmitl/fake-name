const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const axios = require('axios');
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const { CookieJar } = require('tough-cookie');
const jar = new CookieJar();


const getInbox = async function (req, res) {
    try {
        let instance = axios.create({ baseURL: 'https://generator.email', withCredentials: true, jar });
        axiosCookieJarSupport(instance)
        let result = await instance.get('/' + req.params.email, { withCredentials: true, jar });
        const dom = new JSDOM(result.data);
        let link = dom.window.document.getElementsByClassName("mb_blk")[0].getElementsByTagName("a")[0].href
        let parameter = {
            status: true,
            link: link,
            code: link.split("c=")[1].split("&")[0]
        }
        return res.status(200).json(parameter);
    } catch{
        return res.status(200).json({ status: false });
    }
}
module.exports = getInbox;