// AST 节点类
class Node {
    /**
     * 
     * @param {String} content 节点渲染内容, 通过 $ 判断子节点插入位置
     * @param {Boolean} type {0, 1}, 嵌套型语法判断，0: 非嵌套；1: 嵌套
     * @param {Array[Node*]} next 子节点构成的数组，因为是一个 N 叉树
     * @param {Boolean} offset 节点偏移量，判断是否嵌套
     */
    constructor(content = "<div>$</div>", type = 0, offset = 0, next = []) {
        this.content = content
        this.type = type
        this.child = next
        this.offset = offset
    }
}

// 语法转换实例，后期可以结合正则表达式来丰富判断
const translateMap = {
    "#": "<h1>$</h1>",
    "-": "<ul><li>$</li>$</ul>"
}


class Parse {
    constructor() {
        this.rawText = ""
        this.parseRes = ""
    }

    init(text) {
        this.rawText = text.split("\n")
        // console.log(text.split("\n"));
        // console.log(this.rawText.splice(1, 0 ,"123"))
        // console.log(this.rawText)
        const root = this.build()
        const res = this.joint(root)
        return res.split("$").join("")

    }

    joint(node) {
        console.log('ok')
        if (!node.child) {
            return node.content.split("$").join("")
        }
        let html = ""
        node.child.forEach((item) => {
            html += this.joint(item)
        })
        const index = node.content.indexOf("$")
        console.log(node)
        if (index > 0) {
            console.log(node.content)
            return node.content.slice(0, index) + html + node.content.slice(index)
        }
        return node.content;
    }

    show() {
        return this.parseRes
    }

    build() {
        const root = new Node()
        this.recursion(0, root, root)
        return root
    }

    recursion(line, node, preNode) {
        if (line === this.rawText.length) {
            return
        }
        // 拷贝当前行副本
        const text = this.rawText[line]
        // 判断非嵌套
        if (text.trim()[0] === "#") {
            const res = translateMap["#"].split("$")
            res.splice(1, 0, text.trim().slice(1))
            const childNode = new Node(res.join(""))
            preNode.child.push(childNode)
            this.recursion(++line, preNode, preNode)
        }

        if (text.trim()[0] === "-") {
            const offset = text.indexOf("-")
            // 判断父节点是否是嵌套类型
            if (node.type === 1) {
                if (offset < node.offset) {
                    const res = translateMap["-"].split("$")
                    res.splice(2, 0, "$");
                    res.splice(1, 0, text.trim().slice(1))
                
                    
                    const childNode = new Node(res.join(""), 1, offset) 
                    preNode.child.push(childNode)
                    this.recursion(++line, childNode, preNode)
                } else if (offset === node.offset) {
                    const res = ["<li>", "</li>"]
                    res.splice(2, 0, "$");
                    res.splice(1, 0, text.trim().slice(1))

                    const childNode = new Node(res.join(""), 1, offset) 
                    node.child.push(childNode);
                    this.recursion(++line, node, preNode)
                } else {
                    const res = translateMap["-"].split("$")
                    res.splice(2, 0, "$");
                    res.splice(1, 0, text.trim().slice(1))
                
                    
                    const childNode = new Node(res.join(""), 1, offset) 
                    node.child.push(childNode)
                    this.recursion(++line, childNode, preNode)
                }
            } else {
                
                const res = translateMap["-"].split("$")
                res.splice(2, 0, "$");
                res.splice(1, 0, text.trim().slice(1))
            
                
                const childNode = new Node(res.join(""), 1, offset) 
                preNode.child.push(childNode)
                this.recursion(++line, childNode, preNode)
            }
        }
    }
}





// 获取 DOM
const getEl = id => document.querySelector(id)

const inputEl = getEl("#input")
const buttonEl = getEl("#button")
const showEl = getEl("#show")


buttonEl.onclick = () => {
    if (!Parse.instance) {
        const parse = new Parse()
        Parse.instance = parse
    }
    const parse = Parse.instance
    // 获取 raw text，可以考虑异步优化
    const raw = inputEl.value

    const html = parse.init(raw)
    showEl.innerHTML = html
}