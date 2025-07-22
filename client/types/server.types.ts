export interface ServerData<T> {
    message: undefined | string,
    data: T
}

export interface RegisterServerData {
    jwt: string
}