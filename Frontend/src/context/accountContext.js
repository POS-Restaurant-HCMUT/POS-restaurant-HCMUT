import React, { createContext, useState } from "react";

export const AccountContext = createContext()

const AccountContextProvider = ({ children }) => {
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