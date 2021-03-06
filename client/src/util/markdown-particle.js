class Particle {
    constructor(text) {
        this.rules = {
            isHeading: /^(#{1,6}\s*)/,
            isQuote: /^(\>\s+)/,
            isHr: /^(\*{3,}|-{3,})/,
            isCode: /^(```)/,
            isUnOrderList: /^((\*|-){1}\s+)/,
            isOrderList: /^(\d{1}.\s+)/,
        }
        this.lines = text.split('\n')
        const tokens = this.parse()
        this.htmlContent = this.tokensToHTML(tokens)
    }

    parse() {
        const tokens = []
        let cur = 0


        while (this.judgeCycle(cur)) {
            let line = this.lines[cur]

            if (line === "") {
                tokens.push("<br/>")
                cur ++
                continue
            }


            if (this.rules.isHeading.test(line)) {
                let count = 0
                while (line[count] === "#") {
                    count++
                }

                if (line[count] === " ") {
                    const temp = line.slice(count + 1)
                    const str = `<h${count}>${temp}</h${count}>`
                    tokens.push(str)
                    cur ++
                    continue
                }
                
            }

            if (this.rules.isQuote.test(line)) {
                if (line[1] === " ") {
                    let temp = line.slice(2)
                    temp = `<p>${temp}</p>`
                    let nextLine = this.lines[cur + 1]
                    while (this.rules.isQuote.test(nextLine)) {
                        if (nextLine[1] === " ") {
                            temp += (`<p>${nextLine.slice(2)}</p>`)
                            cur ++ 
                            nextLine = this.lines[cur + 1]
                        } else {
                            break
                        }
                    }
                    tokens.push(`<blockquote style="background: #ccc">${temp}</blockquote>`)
                    cur ++
                    continue
                }
            }

            if (this.rules.isHr.test(line)) {
                if (line.length === 3) {
                    tokens.push("<hr/>")
                    cur ++
                    continue
                }
            }

            if (this.rules.isCode.test(line)) {
                let temp = "<pre><code>"
                let nextLine = this.lines[cur + 1]
                while (!this.rules.isCode.test(nextLine) && this.judgeCycle(cur + 1)) {
                    const el = document.createElement("div")
                    el.innerText = nextLine
                    temp += el.innerHTML + '\n'
                    cur ++
                    nextLine = this.lines[cur + 1]
                }
                temp = `<div  style='background: #777'>${temp}</code></pre></div>`
                tokens.push(temp)
                cur += 2
                continue
            }

            if (this.rules.isUnOrderList.test(line)) {
                let temp = `<li>${line.slice(2)}</li>`
                let nextLine = this.lines[cur + 1]
                while (this.rules.isUnOrderList.test(nextLine)) {
                    temp += (`<li>${nextLine.slice(2)}</li>\n`)
                    cur ++
                    nextLine = this.lines[cur + 1]
                }
                temp = `<ul>${temp}</ul>\n`
                tokens.push(temp)
                cur ++
                continue
            }

            if (this.rules.isOrderList.test(line)) {
                let temp = `<li>${line.replace(this.rules.isOrderList, "")}</li>`
                let nextLine = this.lines[cur + 1]
                while (this.rules.isOrderList.test(nextLine)) {
                    temp += (`<li>${nextLine.replace(this.rules.isOrderList, "")}</li>\n`)
                    cur ++
                    nextLine = this.lines[cur + 1]
                }

                temp = `<ol>${temp}</ol>`
                tokens.push(temp)
                cur ++
                continue
            }


            tokens.push(`<p>${line}</p>`)
            cur ++
        }

        return tokens
    }

    // TODO: 行内解析
    parseInline(line) {
        
    }

    judgeCycle(cur) {
        const len = this.lines.length
        return cur < len
    }

    tokensToHTML(tokens) {
        console.log("tokens --------", tokens)
        console.log('html ----', typeof tokens.join(''))
        return tokens.join('')
    }

}


export default Particle