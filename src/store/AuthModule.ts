import AuthService from "@/services/AuthService";
import User from '@/types/User';
import ResponseData from "@/types/ResponseData";

const user = JSON.parse(localStorage.getItem('user') || '{}');

const initialState = user 
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };

export const authState = {
    namespace: false,
    state: initialState,
    actions: {
        //login
        login(context: any, user: User): Promise<any> {
            return AuthService.login(user)
                .then((response: ResponseData) => {
                    if (response.data) {
                        context.commit('loginSuccess', user);
                        return Promise.resolve(user);
                    }
                })
                .catch((error: Error) => {
                    console.log(error);
                })
        },
        logout(context: any) {
            AuthService.logout();
            context.commit('logout');
        },
        register(context: any, user: User): Promise<any> {
            return AuthService.register(user)
                .then((response: ResponseData) => {
                    if (response.data) {
                        context.commit('registerSuccess');
                        return Promise.resolve(response.data)
                    }
                })
                .catch((error: Error) => {
                    console.log(Error);
                });
        }
    },
    mutations: {
        loginSuccess(state: any, user: User) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state: any) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state: any) {
            state.status.loggedIn = false;
            state.user = null;
        },
        registerSuccess(state: any) {
            state.status.loggedIn = false;
        },
        registerFailure(state: any) {
            state.status.loggedIn = false;
        }
    }
}
