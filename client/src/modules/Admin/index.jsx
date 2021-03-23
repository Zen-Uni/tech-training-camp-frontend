/**
 * @description 错误监控
 * @author Uni
 */

import { useEffect, useState } from "react"

function Admin() {
    const [history, setHistory] = useState([])
    const [current, setCurrent] = useState([])
    useEffect(() => {
        const handleWebsocket = () => {
            let flag = 0
            const ws = new WebSocket('ws://60.205.230.224:8080/')
            ws.onopen = () => {
                ws.send('open ws')
                console.log('open ws')
            }
        
            ws.onmessage = e => {
                const data = e.data
                // console.log(data)
                if (flag === 0) {
                    setHistory(JSON.parse(data))
                    flag = 1
                } else {
                    setCurrent((current) => {
                        const arr = JSON.parse(JSON.stringify(current))
                        arr.push(data)
                        return arr
                    })
                }
            }
        
            ws.onclose = () => {
                console.log('close ws')
            }
        }
        handleWebsocket()
    }, [])

    return (
        <>
            <div id="current">
                {
                    current.map((item, index) => {
                        return <div key={index}>{item}</div>
                    })
                }
            </div>
            
            <div id="history">
                {
                    history.map((item, index) => {
                        return <div key={index}>{item}</div>
                    })
                }
            </div>
        </>
    )

}


export default Admin