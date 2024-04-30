/* eslint-disable */
import styled from "styled-components"
import { useUser } from "../features/authentication/useUser"
import Spinner from "./Spinner"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const FullPage = styled.div`
    height: 100dvh;
    background-color: var(--color-grey-100);
    display: flex;
    justify-content: center;
    align-items: center;
`

function ProtectedRoute({children}) {
    const navigate = useNavigate()

    // Load auth user
    const {isLoading, isAuthenticated} = useUser()

     // If no user, then redirect to Login page
    useEffect(function() {
        if (!isAuthenticated && !isLoading) navigate('/login')
    }, [isAuthenticated, isLoading, navigate])

    // Show spinner while loading
    if (isLoading) return (
        <FullPage>
            <Spinner />
        </FullPage>
    )

    // If there is auth user, then render the app

  if (isAuthenticated) return children
}

export default ProtectedRoute