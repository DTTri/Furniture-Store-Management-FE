import LoginDTO from "../entities/DTO/LoginDTO";
import http from "./http";

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
}

export default new authenService();