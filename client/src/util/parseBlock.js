const heading = /^(#{1,6}\s*)/
const retrack = /^(\s\s\s\s*)/


let count = ''

class parseBlock {
    constructor(line) {
        this.line = line
        this.flag = false
        // 记录缩进
    }


    handleHeading() {
        let cut = 0,
            cur = 0
        
        while (this.line[cur] === '#') {
            cut++
            cur++
        } 
        if (this.line[cur] === " " && cut) {
            const res = this.line.slice(++cur)
            return `<h${cut}>${res}</h${cut}>`
        } else {
            return this.line
        }

        
    }


    handleRetract() {
        count = 'retract'
        return `<div style="background: #ccc">${this.line.slice(3)}`
    }


    parse() {

        if (heading.test(this.line)) {
            return this.handleHeading()
        }
    
        if (retrack.test(this.line)) {
            return this.handleRetract()
        }

        // if (quote.test(this.line)) {
        //     return this.handleQuote()
        // }

        if (this.line === '') {   
            if (count === 'retract') {
                count = ''
                return '</div>'
            } else {
                return this.line
            }
        }



        // if (this.line === '') {
        //     return '</div>'
        // }
        

        return this.line
    }
}

export default parseBlock