/**
 * @description 手写一个微型的 markdown 解析器，以为是不断地颗粒化拆分，所以命名为 particle
 * 因为英语太菜想练练英语，所以会给这个模块里的注释添加乡村英文注释，万一那天可以发 npm 上被歪果仁看了对吧嘿嘿
 * @author Uni
 */

class Particle {
    constructor(text) {
        // 存储原始数据 (store raw data)
        this.text = text

        return this.init()
    }

    // 我的思路是先将原始数据按行拆分 (my idea is to break down the raw data into rows first)
    handleNewLine() {
        const raw = this.text
        const value = raw.split('\n')
        return value 
    }

    // 处理标题
    handleTitle(value) {
        const titledValue = value.map(line => {
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
        })


        return titledValue
    }

    


    // 最后进行每一行的数据整合
    handleLine(value) {
        return value.map(line => {
            return `<div>${line}</div>`
        })
    }

    init() {
        const value = this.handleNewLine()
    
        const renderValue = this.handleLine(this.handleTitle(value))
        console.log(renderValue)

        // 因为我的前端是 React，为了方便渲染，这里返回的是一个数组
        return renderValue
    }
}

export default Particle