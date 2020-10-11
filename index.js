// discord
const Discord = require(`discord.js`)
const client = new Discord.Client()
const axios = require("axios")
const config = require("./config.json")
const qs = require("querystring")

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

// 파파고 클래스

const TRANSLATE_METHODS = {
    nmt: "nmt",
    smt: "smt",
}

class Papago {
    constructor(papagoConfig) {
        this.papagoConfig = papagoConfig
    }

    async lookup(term, { method }) {
        if (this.papagoConfig == null) {
            throw new Error("Papago instance should be initialized with papagoConfig first")
        }
        if (term == null) {
            throw new Error("Search term should be provided as lookup arguments")
        }

        const url = method === TRANSLATE_METHODS.smt ? "language/translate" : "papago/n2mt"
        const params = qs.stringify({
            source: "ko",
            target: "ja",
            text: term,
        })
        const papagoConfig = {
            baseURL: "https://openapi.naver.com/v1/",
            headers: {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "x-naver-client-id": this.papagoConfig.NAVER_CLIENT_ID,
                "x-naver-client-secret": this.papagoConfig.NAVER_CLIENT_SECRET,
            },
        }
        const response = await axios.post(url, params, papagoConfig)
        return response.data.message.result.translatedText
    }
}
class JapanesPapago {
    constructor(papagoConfig) {
        this.papagoConfig = papagoConfig
    }

    async lookup(term, { method }) {
        if (this.papagoConfig == null) {
            throw new Error("Papago instance should be initialized with papagoConfig first")
        }
        if (term == null) {
            throw new Error("Search term should be provided as lookup arguments")
        }

        const url = method === TRANSLATE_METHODS.smt ? "language/translate" : "papago/n2mt"
        const params = qs.stringify({
            source: "ja",
            target: "ko",
            text: term,
        })
        const papagoConfig = {
            baseURL: "https://openapi.naver.com/v1/",
            headers: {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "x-naver-client-id": this.papagoConfig.NAVER_CLIENT_ID,
                "x-naver-client-secret": this.papagoConfig.NAVER_CLIENT_SECRET,
            },
        }
        const response = await axios.post(url, params, papagoConfig)
        return response.data.message.result.translatedText
    }
}

// ------- 디스코드가 동작합니다 --------
client.on("message", (message) => {
    if (message.content.startsWith("! papa ")) {
        JAPANESWORD = message.content.replace("! papa ", "")
        async function main() {
            const papago = new JapanesPapago({
                NAVER_CLIENT_ID: config.client_id,
                NAVER_CLIENT_SECRET: config.client_secret,
            })
            const nmtResult = await papago.lookup(JAPANESWORD, { method: "nmt" })
            const feedEmbed = new Discord.MessageEmbed()
                .setColor("#ffc0cb")
                .setTitle(nmtResult)
                .setDescription(`[${JAPANESWORD}]の韓国語ですー！`)
                .setThumbnail(baby.image)
            message.channel.send(feedEmbed)
        }
        main()
    }
    if (message.content.startsWith("! 파파고 ")) {
        KOREANWORD = message.content.replace("! 파파고 ", "")
        async function main() {
            const papago = new Papago({
                NAVER_CLIENT_ID: "ipJ5Vxrkks6XwgINV5Pb",
                NAVER_CLIENT_SECRET: "pV2sEzjZlI",
            })
            const nmtResult = await papago.lookup(KOREANWORD, { method: "nmt" })
            const feedEmbed = new Discord.MessageEmbed()
                .setColor("#ffc0cb")
                .setTitle(nmtResult)
                .setDescription(`[${KOREANWORD}]에 대한 번역입니다.`)
                .setThumbnail(baby.image)
            message.channel.send(feedEmbed)
        }

        main()
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
