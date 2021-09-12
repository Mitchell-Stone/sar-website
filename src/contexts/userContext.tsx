import { createContext } from 'react'

export const UserContext = createContext<any>({
    signedIn: false,
    message: "No valid auth"
})