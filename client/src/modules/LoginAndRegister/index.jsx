import React, { useEffect, useState } from 'react'

// import util
import {
    configReq,
    storeToken,
} from '../../util/token'



// import style components
import {
    SignWrappper,
} from './style'


// import subcomponents
import Login from './Login'
import Register from './Register'
import { useHistory } from 'react-router'
import {
    testToken
} from '../../service'

function LoginAndRegister() {

    const history = useHistory()

    useEffect(() => {   
        configReq()
        async function fetchData() {
            const res = await testToken()
            console.log(res)
        }

        fetchData()
        console.log(1)
        // console.log(res)
    }, [])

    const [login, setLogin] = useState(true)


    const handleChangeComponents = () => {
        setLogin(() => {
            return !login
        })
    }

    return (
        <SignWrappper>
            {
                login ? <Login handleChange={handleChangeComponents}/> : <Register handleChange={handleChangeComponents}/>
            }
        </SignWrappper>
    )
}

export default LoginAndRegister