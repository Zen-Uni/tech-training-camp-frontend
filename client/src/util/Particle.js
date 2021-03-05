import parseBlock from './parseBlock'


class Particle {
    constructor(text) {
        this.text = text
    
        this.lines = this.text.split('\n')

        return this.integrateLine()
    }

    // 将文本拆分成单段处理
    splitLines(lines) {
        return lines.map(line => {
            const blockLine = new parseBlock(line)
          
            return blockLine.parse()
        }) 
    }


    integrateLine() {
        const lines = this.splitLines(this.lines)

        const arr = lines.map(line => {
     
            return `<p>${line}</p>`
        })
     
        return arr
    }
}

export default Particle