export type SignInCredential = {
    email: string
    password: string
}

export type SignInResponse = {
    data: {
        token: string
        userDetails: {
            id: string
            email: string
            name: string
            loginType: string

        }
        page: []
        subPage: []
    }
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    userName: string
    email: string
    password: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}
