import { RegFormType, VerifyAccount } from "@types-my/form.types";
import { ServerData, RegisterServerData } from "@types-my/server.types";

export default abstract class AuthMethods {
    public static async register (data: RegFormType): Promise<string> {
        const res = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const server_data: ServerData<never> = await res.json();

        if(!res.ok) throw new Error(server_data.message || 'Произошла ошибка')
        
        return server_data.message || 'Произошла ошибка';
    }
    public static async verify (data: VerifyAccount): Promise<string> {
        const res = await fetch('/api/verify', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const server_data: ServerData<RegisterServerData> = await res.json();

        if(!res.ok) throw new Error(server_data.message || 'Произошла ошибка')
        
        return server_data.data.jwt;
    }
}