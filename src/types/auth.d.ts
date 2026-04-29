type FormProps = {
    name: string
    email?: string
    password: string
}

export const initialState: FormProps = {
    name: "",
    email: "",
    password: ""
}