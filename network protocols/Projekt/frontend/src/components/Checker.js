import {useEffect} from 'react'
import Cookies from 'universal-cookie'
import { connect } from 'react-redux';
import { LoginPlayerAction, SetPlayerID } from '../actions/MainActions'

const Checker = ({LoginPlayerAction, SetPlayerID}) => {

    const cookies = new Cookies();
    
    useEffect(() => {
        if (cookies.get('logged') === 'true') {
            LoginPlayerAction(cookies.get('username'))
            SetPlayerID(cookies.get('username'))
        }
    }, [])

    return (
        null
    )
}



const mapDispatchToProps = {
    LoginPlayerAction,
    SetPlayerID
}

export default connect(undefined, mapDispatchToProps)(Checker)