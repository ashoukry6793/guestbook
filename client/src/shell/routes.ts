import {RoutePath, routePaths} from "../core/routes/routes";
import Login from "./views/login/Login";
import Register from "./views/Register/Register";
import Home from "./views/home/Home";

export default [
    {
        path: routePaths.LOGIN_VIEW_PATH,
        view: Login
    },
    {
        path: routePaths.REGISTER_VIEW_PATH,
        view: Register
    },
    {
        path: routePaths.HOME_VIEW_PATH,
        view: Home
    }
] as Route[]

interface Route {
    path: RoutePath;
    view: () => JSX.Element;
}
