import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

import { logout as logoutApi } from '../../services/apiAuth'


export function useLogout() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { isLoading, mutate: logout } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            // remove not only user query but all queries
            queryClient.removeQueries()
            navigate('/login', { replace: true })
        }
    })

    return { isLoading, logout }
}