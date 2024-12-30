import LoginDTO from "../entities/DTO/LoginDTO";
import http from "../api/http";

class authenService{
    baseUri: string;
    constructor() {
        this.baseUri = "";
    }
    private getURI(uri: string) {
        return `${this.baseUri}${uri}`;
    }
    async login(staffAccount: LoginDTO){
        return await http.post(this.getURI("login"), staffAccount); 
    }
    async forgotPassword(email: string){
        return await http.post(this.getURI("forgot-password"), {email}); 
    }
    async resetPassword(data: Object){
        return await http.post(this.getURI("reset-password"), data); 
    }
    async verifyToken(token: string){
        return await http.post(this.getURI("verify-forgot-password-token"), {token});
    }
}

export default new authenService();