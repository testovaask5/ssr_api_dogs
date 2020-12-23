const { EventEmitter } = require('events');
class MyEmitter extends EventEmitter { }
const fetch = require('node-fetch').default
const { JSDOM } = require("jsdom");
const { promisify } = require('util');

/**
 * SSR render a page by the resource name
 * @param {string} serverUrl
 * @param {string} resourceName 
 */
function renderPage(serverUrl, resourceName) {
    function getPageUrl(pathname = '/', prefix = '') {
        if (pathname.startsWith('/')) pathname = pathname.slice(1)        
        return new URL(`${prefix}/${pathname}`, serverUrl).href
    }
    return async function (pathname = '/') {
        const renderEmitter = new MyEmitter()
        const finishRender = promisify(renderEmitter.once.bind(renderEmitter))
        const dom = await JSDOM.fromFile("./client/dist/index.html", {
            runScripts: "dangerously",
            resources: "usable",
            url: getPageUrl(pathname, resourceName),
            beforeParse(window) {
                /**
                 * @param {string} url 
                 * @param {import('node-fetch').RequestInit} options 
                 */
                // @ts-ignore
                window.fetch = (url, options) => {
                    return fetch(getPageUrl(url), options)
                }
                window.finishRender = () => renderEmitter.emit('finish')
                window.SSR = true
            }
        })
        await finishRender('finish')
        return dom.serialize()
    }
}

module.exports = renderPage