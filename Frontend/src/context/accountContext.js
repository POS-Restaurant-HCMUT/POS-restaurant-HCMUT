import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";

export const AccountContext = createContext()

const AccountContextProvider = ({ children }) => {
    const history = useHistory();
    const [account, setAccount] = useState({
        userName: '',
        passWord: ''
    })

    // set account
    const accountLogin = (accName, accPwd) => {
        setAccount({
            userName: accName,
            passWord: accPwd
        })
    }

    const logoutAccount = () => {
        setAccount({
            userName: '',
            passWord: ''
        })
        history.push("/demo");
        window.location.reload(false);
    }

    //context data
    const accountContextData = {
        account,
        accountLogin,
        logoutAccount
    }

    // return provider
    return (
        <AccountContext.Provider value={accountContextData}>
            {children}
        </AccountContext.Provider>
    )
}

export default AccountContextProvider