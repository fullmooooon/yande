let axios = require('axios').default
const fs = require('fs')
const cheerio = require('cheerio')
const download = require('download')
const createGlobalProxyAgent = require('global-agent').createGlobalProxyAgent

// const globalProxyAgent = createGlobalProxyAgent()
// globalProxyAgent.HTTP_PROXY = 'http://127.0.0.1:10809'

let monthStart = 1
let yearStart = 2018

;(async () => {
    for (let year = yearStart; year <= 2020; year++) {
        for (let month = monthStart; month <= 12; month++) {
            console.log(`${year}年${month}月`)
            let res = await axios.get(`https://yande.re/post/popular_by_month?month=${month}&year=${year}`)
            console.log(`${year}年${month}月 html get!`)
            let $ = cheerio.load(res.data)
            let nodeArr = $('.directlink')
            for (index = 0; index < nodeArr.length; index++) {
                item = nodeArr[index]
                let url = item.attribs.href
                let dir = `./dist/${year}/${month}/`
                let path = dir + `${index}${url.substring(url.lastIndexOf('.'))}`
                if (fs.existsSync(path)) continue
                console.log(path)
                console.log(`download ${url}`)
                let data = await download(url)
                fs.mkdirSync(dir, { recursive: true })
                fs.writeFileSync(path, data)
            }
        }
    }
})()

// href: 'https://files.yande.re/jpeg/ea6632c8db1bf1530542cd5de81cc211/yande.re%20741196%20bra%20breasts%20cropped%20garter_belt%20lingerie%20miwabe_sakura%20nipples%20open_shirt%20pantsu%20photoshop%20stockings%20string_panties%20thighhighs%20undressing.jpg'
