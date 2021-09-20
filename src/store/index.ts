import { createStore } from "vuex";
import { authState } from "./AuthModule";

export default createStore({
    modules: {
        authState
    }
});
