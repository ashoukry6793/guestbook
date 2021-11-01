export const routePaths: RoutePaths = {
    LOGIN_VIEW_PATH: '/login',
    REGISTER_VIEW_PATH: '/register',
    HOME_VIEW_PATH: '/',
}

export type RoutePath = string;

interface RoutePaths {
    [key: string]: RoutePath;
}
