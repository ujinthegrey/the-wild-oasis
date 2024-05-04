/* eslint-disable */
import { useMutation } from "@tanstack/react-query";

import { signup as signupApi } from '../../services/apiAuth'
import toast from "react-hot-toast";

export function useSignup() {
    const {isLoading, mutate: signup} = useMutation({
        mutationFn: signupApi,
        onSuccess: (user) => {
            toast.success('Account successfully created! Please verify the new account from user\'s email address.')
        }
    })

    return { isLoading, signup }
}