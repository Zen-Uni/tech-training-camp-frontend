


class Tool {
    constructor(text) {
        this.text = text
        this.heading = this.heading.bind(this)
        this.em = this.em.bind(this)
        this.quote = this.quote.bind(this)
        this.strong = this.strong.bind(this)
        this.code = this.code.bind(this)
        this.codeBlock = this.codeBlock.bind(this)
        this.link = this.link.bind(this)
        this.pic = this.pic.bind(this)
    }

    handleSite(e) {

        e.preventDefault()

        const selection = window.getSelection()
        // console.log(selection.getRangeAt(0))
        const range = selection.getRangeAt(0)
        console.log(range.startOffset)
        console.log(range.endOffset)

        return {range, selection}
    }

    handleAdd(e, html) {
        let {range, selection: sel} = this.handleSite(e)
        range.deleteContents();
        var el = document.createElement("div");
        el.innerHTML = html;
        var frag = document.createDocumentFragment(),
            node, lastNode;
        while ((node = el.firstChild)) {
            lastNode = frag.appendChild(node);
        }
        range.insertNode(frag);
        // Preserve the selection
        if (lastNode) {
            range = range.cloneRange();
            range.setStartAfter(lastNode);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }

    heading(e) {
        const html = "#&nbsp;"
        this.handleAdd(e, html)
    }

    em(e) {
        const html = "*斜体*"
        this.handleAdd(e, html)
    }

    quote(e) {
        const html = ">&nbsp;"
        this.handleAdd(e, html)
    }

    strong(e) {
        const html = "**粗体**"
        this.handleAdd(e, html)
    }

    code(e) {
        const html = "`代码`"
        this.handleAdd(e, html)
    }

    codeBlock(e) {
        const html = "```<br/>```"
        this.handleAdd(e, html)
    }

    link(e) {
        const html = "[]()"
        this.handleAdd(e, html)
    } 

    pic(e) {
        const html = "![]()"
        this.handleAdd(e, html)
    }
}




// 渲染信息
const toolBarConfig = [
    {
        icon: "icon-header",
        fn: "heading",
    },
    {
        icon: "icon-qingxie",
        fn: "em"
    },
    {
        icon: "icon-jiacu",
        fn: "strong"
    },
    {
        icon: "icon-yinyong",
        fn: "quote"
    },
    {
        icon: "icon-code",
        fn: "code"
    },
    {
        icon: "icon-kuohaobrackets",
        fn: "codeBlock"
    },
    {
        icon: "icon-link-fill",
        fn: "link"
    },
    {
        icon: "icon-tupian",
        fn: "pic"
    }
]


export {
    Tool,
    toolBarConfig,
}