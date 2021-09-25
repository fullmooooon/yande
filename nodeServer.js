let axios = require('axios').default
let dayjs = require('dayjs')
const fs = require('fs')
const cheerio = require('cheerio')
const download = require('download')
const sharp = require('sharp')

// const createGlobalProxyAgent = require('global-agent').createGlobalProxyAgent
// const globalProxyAgent = createGlobalProxyAgent()
// globalProxyAgent.HTTP_PROXY = 'http://127.0.0.1:10809'

let nowYear = dayjs().year()
let nowMonth = dayjs().month() + 1

let monthStart = 1
let yearStart = 2015
let baseUrl = 'https://oreno.imouto.us'
let rootUrl = 'https://yande.re'

    ; (async () => {
        for (let year = yearStart; year <= 2021; year++) {
            for (let month = monthStart; month <= 12; month++) {
                console.log(`${year}年${month}月`)
                if (year == nowYear && month >= nowMonth) continue
                let res = await axios.get(`${baseUrl}/post/popular_by_month?month=${month}&year=${year}`)
                console.log(`${year}年${month}月 html get!`)
                let $ = cheerio.load(res.data)
                let imageArr = $('.directlink')
                let urlArr = $('.thumb')
                let dir = `./dist/${year}/${month}/`
                let dir_avif = `./dist_avif/${year}/${month}/`
                let summary = ''
                for (index = 0; index < imageArr.length; index++) {
                    item = imageArr[index]
                    let url = item.attribs.href
                    let path = dir + `${index}${url.substring(url.lastIndexOf('.'))}`
                    let path_avif = dir_avif + `${index}.avif`
                    summary += `${index}.png  \r\n    ${baseUrl}${urlArr[index].attribs.href} \r\n    ${rootUrl}${urlArr[index].attribs.href} \r\n`
                    if (!fs.existsSync(path)) {
                        console.log(path)
                        console.log(`download ${url}`)
                        let data = await download(url)
                        fs.mkdirSync(dir, { recursive: true })
                        fs.writeFileSync(path, data)
                    }
                    if (!fs.existsSync(path_avif)) {
                        console.log(path_avif)
                        fs.mkdirSync(dir_avif, { recursive: true })
                        sharp(path).avif().toFile(path_avif, (err, info) => {
                            console.log(err, info);
                        })
                    }
                }
                fs.writeFileSync(`${dir_avif}/sumary.txt`, summary)
                fs.writeFileSync(`${dir}/sumary.txt`, summary)
            }
        }
    })()

