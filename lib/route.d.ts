import { Routes } from "./routes";
export interface RouteOptions {
    hidden?: boolean;
}
export interface RouteDef {
    method: string;
    resource: string;
    path: string;
    options: RouteOptions;
}
export declare class Route {
    private routes;
    method: string;
    path: string;
    resource: string;
    href: string;
    options: RouteOptions;
    constructor(routes: Routes, def: RouteDef);
    routesMiddleware(req: any, res: any, next: any): void;
    handle(handler: any): void;
}
