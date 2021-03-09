import React, { useState } from 'react'

// import style components
import {
    SignWrappper,
} from './style'


// import subcomponents
import Login from './Login'
import Register from './Register'

function LoginAndRegister() {

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