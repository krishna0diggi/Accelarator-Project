export type User = {
    id?: number,
    email?:string,
    role?:string
}
export type AuthState = {
    user:User | null;
    token: string | null;
    isAuthenticated : boolean;
    isLoading: boolean;
    error: string | null;
}
export type LoginCredentials = {
    email: string;
    password: string;
}
export type SignUpCredentials = {
    name: string;
    email:string;
    password:string;
    confirmPassword:string;
    role:number;
}