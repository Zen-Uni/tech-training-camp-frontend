class Particle {
    constructor(text) {
        this.rules = {
            isHeading: /^(#{1,6}\s*)/,
            isQuote: /^(\>\s+)/,
            isHr: /^(\*{3,}|-{3,})/,
            isCode: /^(```)/,
            isUnOrderList: /^((\*|-){1}\s+)/,
            isOrderList: /^(\d{1}.\s+)/,
            isCodeWord: /\`{1}(.*?)\`{1}/g,
            isImage: /\!\[(.*?)\]\((.*?)\)/g,
            isStrong: /\*{2}(.*?)\*{2}/g,
            isLink: /\[(.*?)\]\((.*?)\)/g,
            isEm: /\*{1}(.*?)\*{1}/g
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

            line = this.parseInline(line)
            tokens.push(`<p>${line}</p>`)
            cur ++
        }

        return tokens
    }

    // TODO: 行内解析
    parseInline(line) {
        if (this.rules.isCodeWord.test(line)) {
            line = line.replace(this.rules.isCodeWord, (res, str) => {
                return `<code style="background: grey">${str}</code>`
            })
        }

        if (this.rules.isImage.test(line)) {
            line = line.replace(this.rules.isImage, (res, str1, str2) => {
                return `<div><img src=${str2} alt=${str1}></div>`;
            })
        }

        if (this.rules.isStrong.test(line)) {
            line = line.replace(this.rules.isStrong, (res, str) => {
                return `<b>${str}</b>`
            })
        }

        if (this.rules.isLink.test(line)) {
            line = line.replace(this.rules.isLink, (res, str1, str2) => {
                return `<a href=${str2}>${str1}</a>`
            })
        }

        if (this.rules.isEm.test(line)) {
            line = line.replace(this.rules.isEm, (res, str) => {
                return `<em>${str}</em>`
            })
        }

        return line
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