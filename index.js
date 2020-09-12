// 네이버 Papago NMT API 예제
var express = require("express")
var app = express()
var client_id = "ipJ5Vxrkks6XwgINV5Pb"
var client_secret = "pV2sEzjZlI"
let port = 81

// discord
const Discord = require(`discord.js`)
const client = new Discord.Client()
const axios = require("axios")
const config = require("./config.json")

// default
const baby = {
    year: 0,
    feed: 0,
    chin: "",
    image:
        "https://purepng.com/public/uploads/medium/purepng.com-winnie-the-pooh-babywinnie-poohwinniepoohpooh-bearbearwinnie-the-poohteddy-bearcharacterbook-winnie-the-pooh-1926pooh-corner-1928winnie-pooh-and-piglet-1701528660495cibvs.png",
}

client.on("ready", () => {
    console.log("I am ready!")
})

feedBaby = () => {
    baby.feed += 1
    console.log("feed is" + baby.feed)
}

fatFace = () => {
    baby.chin += " "
}

oldBaby = () => {
    baby.feed = 0
    baby.year += 1
    fatFace()
    console.log("year is" + baby.year)
}

// ------- 디스코드가 동작합니다 --------
client.on("message", (message) => {
    // 번역기 (클릭해야 답변이 옵니다)
    if (message.content.startsWith("! 파파고 ")) {
        KOREANWORD = message.content.replace("! 파파고 ", "")
        app.get("/translate", function (req, res) {
            var api_url = "https://openapi.naver.com/v1/papago/n2mt"
            var request = require("request")
            var options = {
                url: api_url,
                form: { source: "ko", target: "ja", text: KOREANWORD },
                headers: { "X-Naver-Client-Id": client_id, "X-Naver-Client-Secret": client_secret },
            }
            options.form.text = KOREANWORD
            console.log(options)
            function translateK() {
                request.post(options, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" })
                        res.end(body)
                        var come = JSON.parse(body)
                        TRANS = come.message.result.translatedText
                        const KEmbedK = new Discord.MessageEmbed()
                            .setColor("#ffc0cb")
                            .setTitle("TRANSLATED!")
                            .setDescription(TRANS)
                        message.channel.send(KEmbedK)
                    } else {
                        res.status(response.statusCode).end()
                        console.log("error = " + response.statusCode)
                    }
                })
            }
            translateK()
        })
        const listener = app.listen(port, function () {
            message.reply(`http://127.0.0.1:${listener.address().port}/translate`)
            port++
        })
    }
    if (message.content.startsWith("! papa ")) {
        JAPANWORD = message.content.replace("! papa ", "")
        app.get("/translate", function (req, res) {
            var api_url = "https://openapi.naver.com/v1/papago/n2mt"
            var request = require("request")
            var options2 = {
                url: api_url,
                form: { source: "ja", target: "ko", text: JAPANWORD },
                headers: { "X-Naver-Client-Id": client_id, "X-Naver-Client-Secret": client_secret },
            }
            console.log(options2)
            request.post(options2, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" })
                    res.end(body)
                    var come = JSON.parse(body)
                    TRANS__J = come.message.result.translatedText
                    const transEmbed = new Discord.MessageEmbed()
                        .setColor("#ffc0cb")
                        .setTitle(TRANS__J)
                        .setDescription(`${JAPANWORD} \n 파파고 번역기로 일본어를 번역했습니다.`)
                        .setThumbnail(
                            "https://purepng.com/public/uploads/medium/purepng.com-tranlate-icon-android-lollipopsymbolsiconsgooglegoogle-iconsandroid-lollipoplollipop-iconsandroid-50-7215225972873jvis.png"
                        )
                    message.channel.send(transEmbed)
                } else {
                    res.status(response.statusCode).end()
                    console.log("error = " + response.statusCode)
                }
            })
        })
        const listener = app.listen(port, function () {
            message.reply(` GO! => http://127.0.0.1:${listener.address().port}/translate`)
            port++
        })
    }
    // 등장하기
    if (message.content == "! 상태") {
        const stateEmbed = new Discord.MessageEmbed()
            .setColor("#ffc0cb")
            .setTitle(`(${baby.chin}o^～^o${baby.chin}) 무럭무럭 자라 ${baby.year}kg이야!`)
            .setImage(baby.image)
        message.channel.send(stateEmbed)
    }
    //밥먹기
    if (
        (message.content == "! 밥") |
        (message.content == "! 밥묵자") |
        (message.content == "! 먹어") |
        (message.content == "! 먹이")
    ) {
        if (baby.feed > 1) {
            oldBaby()
            EMBEDTEXT = `(´З｀${baby.chin}) 너무 만차나...`
        } else if (baby.feed == 1) {
            feedBaby()
            EMBEDTEXT = `ε=(∀-*${baby.chin}) 꺼억`
        } else if (baby.feed == 0) {
            feedBaby()
            EMBEDTEXT = `((${baby.chin}￣～￣${baby.chin})) 초묵초묵`
        }
        const feedEmbed = new Discord.MessageEmbed()
            .setColor("#ffc0cb")
            .setTitle(EMBEDTEXT)
            .setThumbnail(baby.image)
            .setDescription(`LV.${baby.year}`)
            .setThumbnail(baby.image)
        message.channel.send(feedEmbed)
    }
    // 일어 등장하기
    if (message.content == "! 様子") {
        const stateEmbed = new Discord.MessageEmbed()
            .setColor("#ffc0cb")
            .setTitle(`(${baby.chin}o^～^o${baby.chin}) もはや ${baby.year}kgになりました!`)
        message.channel.send(stateEmbed)
    }
    //일어 밥먹기
    if (
        (message.content == "! ご飯") |
        (message.content == "! ごはん") |
        (message.content == "！　ご飯") |
        (message.content == "！　ごはん") |
        (message.content == "！ご飯") |
        (message.content == "！ごはん")
    ) {
        if (baby.feed > 1) {
            oldBaby()
            EMBEDTEXT = `(´З｀${baby.chin}) もうこれ以上は無理...`
        } else if (baby.feed == 1) {
            feedBaby()
            EMBEDTEXT = `ε=(∀-*${baby.chin}) ゲプッ`
        } else if (baby.feed == 0) {
            feedBaby()
            EMBEDTEXT = `((${baby.chin}￣～￣${baby.chin})) ﾓｸﾞﾓｸﾞ`
        }
        const feedEmbed = new Discord.MessageEmbed()
            .setColor("#ffc0cb")
            .setTitle(EMBEDTEXT)
            .setDescription(`LV.${baby.year}`)
            .setThumbnail(baby.image)
        message.channel.send(feedEmbed)
    }
})

client.on("message", (message) => {
    //날씨 가져오기
    if (message.content.startsWith("! now ")) {
        const city = message.content.replace("! now ", "")
        getWeather = async (city) => {
            const {
                data: {
                    main: { temp },
                    weather,
                    name,
                },
            } = await axios.get(
                `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4fab0aa151dff647eb08468ce01ec59c&units=metric`
            )
            // message.channel.send(
            //     `${temp}˚ || It's ${weather[0].main} day! (${baby.chin}o^～^o${baby.chin})`
            // )
            const embed = new Discord.MessageEmbed()
                .setColor("#ffc0cb")
                .setTitle(`${temp}˚, in ${name}`)
                .setDescription(
                    `It's ${weather[0].main} day! The weather is ${weather[0].description} now. (${baby.chin}o^～^o${baby.chin})`
                )
                .setThumbnail(
                    "https://purepng.com/public/uploads/medium/purepng.com-weather-iconsymbolsiconsapple-iosiosios-8-iconsios-8-721522596142xln6f.png"
                )
            message.channel.send(embed)
        }
        getWeather(city)
    }
    if (message.content === "임배드") {
        const embed = new Discord.MessageEmbed()
            .setColor("#ffc0cb")
            .setTitle("제목")
            .setDescription("설명")
        message.channel.send(embed)
    }
})

// 여러분의 디스코드 토큰으로 디스코드에 로그인합니다
client.login(config.token)
