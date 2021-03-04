/**
 * @description 手写一个微型的 markdown 解析器，以为是不断地颗粒化拆分，所以命名为 particle
 * 因为英语太菜想练练英语，所以会给这个模块里的注释添加乡村英文注释，万一那天可以发 npm 上被歪果仁看了对吧嘿嘿
 * @author Uni
 */

class Parse {
    constructor(line) {
        this.line = line;
        this.heading = /^(#{1,6}\s*)/;
        this.hr = /^(\*{3,}|-{3,})/;
        this.blockQuote = /^(\>\s+)/;
        this.unorderedList = /^((\*|-){1}\s+)/;
        this.orderedList = /^(\d{1}.\s+)/;
        this.codeBlock = /^(```)/;
        this.link = /\[(.*?)\]\((.*?)\)/g;
        this.image = /\!\[(.*?)\]\((.*?)\)/g;
        this.strongText = /\*{2}(.*?)\*{2}/g;
        this.emText = /\*{1}(.*?)\*{1}/g;
        this.codeLine = /\`{1}(.*?)\`{1}/g;
        this.retract = function() {
            let cut = 0,
                cur = 0
            console.log(this.line[cur] == ' ')
            while (cur < 4 && this.line[cur] ===  ' ') {
                console.log('count')
                cut++
                cur++
            } 
            console.log(cut)
            if (cut === 4) {
                return true
            }
            return false
        }
    }

    isHeading() {
        return this.heading.test(this.line)
    }
}




class Particle {
    constructor(text) {
        // 存储原始数据 (store raw data)
        this.text = text

        return this.init()
    }

    // 我的思路是先将原始数据按行拆分 (my idea is to break down the raw data into rows first)
    splitToLine() {
        const raw = this.text
        const value = raw.split('\n')
        return value 
    }


    mapLine(lines) {
        return lines.map(line => {
            return this.operateLine(line)
        })
    }


    operateLine(raw) {
        const line = new Parse(raw)

        if (line.isHeading()) {
            raw = this.handleTitle(raw)
        }

        if (line.retract()) {
            console.log('retract')
            raw = `<code style="background: black">${raw.slice(4)}</code>`
        }
        return raw
    }



    // 处理标题
    handleTitle(line) {
        let cut = 0,
            cur = 0

        while (line[cur] === '#') {
            cut++
            cur++
        }
        
        console.log(line[cur] === ' ')
        if (line[cur] === ' ' && cut) {
            console.log(cut)
            const res = line.slice(++cur)
            return `<h${cut}>${res}</h${cut}>`
        } else {
            return line
        }
    }

    


    // 最后进行每一行的数据整合
    joinLine(value) {
        return value.map(line => {
            return `<div>${line}</div>`
        })
    }

    // TODO: 优化解析模式，先拆分，对每个数组进行首元素处理
    /**
     * @returns {Array}
     */
    init() {
        const lines = this.splitToLine()
    
        const value = this.mapLine(lines)
  
        const renderValue = this.joinLine(value)
        return renderValue
    }
}

export default Particle

