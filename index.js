const Discord = require(`discord.js`)
const client = new Discord.Client()

const baby = {
    year: 0,
    feed: 0,
    chin: "",
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

client.on("message", (message) => {
    // 등장하기
    if (message.content == "! 상태") {
        message.channel.send(
            `(${baby.chin}o^～^o${baby.chin}) 유스케는 무럭무럭 자라 ${baby.year}살이야!`
        )
    }
    // 밥먹기
    if (message.content == "! 밥") {
        if (baby.feed > 1) {
            oldBaby()
            message.channel.send(`(´З｀${baby.chin}) 더는 못먹어...`)
        } else if (baby.feed == 1) {
            feedBaby()
            message.channel.send(`((${baby.chin}￣～￣${baby.chin})) 냠냠`)
            message.channel.send(`ε=(∀-*${baby.chin}) 꺼억`)
        } else {
            feedBaby()
            message.channel.send(`((${baby.chin}￣～￣${baby.chin})) 냠냠`)
        }
    }
    // 일어 등장하기
    if (message.content == "! 様子") {
        message.channel.send(
            `(${baby.chin}o^～^o${baby.chin}) もはや Eypinは ${baby.year}歳になりました!`
        )
    }
    // 일어 밥먹기
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
            message.channel.send(`(´З｀${baby.chin}) もうこれ以上は無理...`)
        } else if (baby.feed == 1) {
            feedBaby()
            message.channel.send(`((${baby.chin}￣～￣${baby.chin})) ﾓｸﾞﾓｸﾞ`)
            message.channel.send(`ε=(∀-*${baby.chin}) ゲプッ`)
        } else {
            feedBaby()
            message.channel.send(`((${baby.chin}￣～￣${baby.chin})) ﾓｸﾞﾓｸﾞ`)
        }
    }
})
// 여러분의 디스코드 토큰으로 디스코드에 로그인합니다
client.login(`NzE4NjM1MTEzNTg3NjcxMTEw.XtrvGg.OPZXcvrOMjRQUCaN2LfoaYUnAzs`)
