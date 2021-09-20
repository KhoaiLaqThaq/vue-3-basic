import axios from "axios";
import http from '@/http-common';
import User from '@/types/User';

class AuthService {
    login(user: User) {
        return http.post('/signin', user)
    }

    logout() {
        localStorage.removeItem('user');
    }

    register (user: User): Promise<any> {
        return http.post('/signup', user);
    }
}

export default new AuthService();
