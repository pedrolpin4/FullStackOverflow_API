export interface UsersReq {
    name: string;
    class: string;
}

export interface DbUser extends UsersReq{
    id: number;
    token: string;
}
