

export const russian = (text, language) => {

    // if(language === 'ru-RU') {
    //     if (text.includes("голос включить")) {
    //         return 'голос включен'
    //     }
    //     if (text.includes("голос отключить") || text.includes("голос выключить")) {
    //         return 'голос выключен'
    //     }
    //     if (text.includes("мимика включить")) {
    //         return "мимика включена"
    //     }
    //     if (text.includes("мимика отключить") || text.includes("мимика выключить")) {
    //         return "мимика выключена"
    //     }
    //     if (text.includes("всё включить") || text.includes("включить всё")) {
    //         return "мимика и голос включены"
    //     }
    //     if (text.includes("всё выключить") || text.includes("выключить всё")) {
    //         return "мимика и голос выключены"
    //     }
    // }

    if(language === 'ru-RU') {
        // if (text.includes("вики") || text.includes("микки") || text.includes("витя")) {
        //     return "да, Сергей."
        // }
        if (text.includes("перед") || text.includes("перёд")) {
            return "вперёд"
        }
        else if (text.includes("назад")) {
            return "назад"
        }
        else if (text.includes("лево") || text.includes("лева") || text.includes("лего") || text.includes("лёва")) {
            return "влево"
        }
        else if (text.includes("права") || text.includes("право") || text.includes("справо") || text.includes("справа") || text.includes("трава")) {
            return "вправа"
        }
        else if (text.includes("стоп") || text.includes("стоп")) {
            return "стоп"
        }
        else return ''
    }

    if(language === 'en-GB') {
        if (text.includes('go')) {
            return 'go'
        }
        else if (text.includes('back')) {
            return 'back'
        }
        else if (text.includes('left')) {
            return 'left'
        }
        else if (text.includes('right')) {
            return 'right'
        }
        else if (text.includes('stop')) {
            return 'stop'
        }
        else return ''
    }
}
