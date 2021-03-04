const heading = /^(#{1,6}\s*)/
const retrack = /^(\s\s\s\s*)/

class parseBlock {
    constructor(line) {
        this.line = line
        this.flag = false
        this.point = 0
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
        return `<div style="background: #ccc">${this.line.slice(3)}`
    }


    parse() {
        if (heading.test(this.line)) {
            return this.handleHeading()
        }
    
        if (retrack.test(this.line)) {
            console.log('okkkkkk')
            return this.handleRetract()
        }

        // console.log(this.point)

        if (this.line === '') {   
            return "</div>"
        }

        // if (this.line === '') {
        //     return '</div>'
        // }
        

        return this.line
    }
}

export default parseBlock