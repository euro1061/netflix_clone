import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    User,
} from 'firebase/auth'
import { auth } from '../firebase'
import { useRouter } from 'next/router'

interface AuthContext {
    children: React.ReactNode
}

interface IAuth {
    user: User | null
    loading: boolean
    signUp: (email: string, password: string) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    error: string | null
}

const AuthContext = createContext<IAuth>({
    user: null,
    loading: false,
    signUp: async () => { },
    signIn: async () => { },
    logout: async () => { },
    error: null,
})

export const AuthProvider = ({ children }: AuthContext) => {
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [initialLoading, setInitialLoading] = useState(true)

    useEffect(
        () => onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                setLoading(false)
            } else {
                setUser(null)
                setLoading(false)
                router.push("/login")
            }
            setInitialLoading(false)
        })
        ,[auth]
    )

    const signUp = async (email: string, password: string) => {
        setLoading(true)
        setError(null)
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password)
            setUser(user.user)
            router.push("/")
            setLoading(false)
        } catch (error: any) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const signIn = async (email: string, password: string) => {
        setLoading(true)
        setError(null)
        try {
            const user = await signInWithEmailAndPassword(auth, email, password)
            setUser(user.user)
            router.push("/")
            setLoading(false)
        } catch (error: any) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        setLoading(true)
        try {
            await signOut(auth)
            setUser(null)
            router.push("/login")
            setLoading(false)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const memoedValue = useMemo(() => ({
        user,
        loading,
        signUp,
        signIn,
        logout,
        error
    }), [user, loading])

    return (
        <AuthContext.Provider value={memoedValue}>
            {!initialLoading && children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext)
}