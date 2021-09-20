import http from '@/http-common';
import axios from "axios";
import authHeader from "./auth-header";

class UserService {
    getPublicContent(): Promise<any> {
        return http.get('/all');
    }

    getUserBoard(): Promise<any> {
        return http.get('/user', { headers: authHeader() });
    }

    getModeratorBoard(): Promise<any> {
        return http.get('/mod', { headers: authHeader() });
    }

    getAdminBoard(): Promise<any> {
        return http.get('/admin', { headers: authHeader() });
    }
}

export default new UserService();
