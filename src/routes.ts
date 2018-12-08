import * as express from "express";

import { RouteOptions, RouteDef, ACLOptions } from "./interfaces";
import { Route } from "./route";

import { routesStore } from "./routes-store";
import { pathToTemplate } from "./functions";

export interface RoutesOptions {
  url?:string;
  
  routerOptions?:express.RouterOptions;
  
}

export class Routes {

  routes:Route[] = [];

  router:express.Router;  
  
  options:RoutesOptions;
  
  rootUrl:string = "/";

  constructor(public instanceOptions:RoutesOptions){
    
    this.options = instanceOptions || {};
    
    this.rootUrl = this.options.url || "/";
    
    this.routes = routesStore.routes;
    
    const routerOptions = Object.assign({mergeParams:true},this.options.routerOptions);
    
    this.router = express.Router(routerOptions);
    
  }

  get(resource:string, path:string, options:RouteOptions) {
    return this.createRoute("get", resource, path, options);
  }

  post(resource:string, path:string, options:RouteOptions) {
    return this.createRoute("post", resource, path, options)
  }

  put(resource:string, path:string, options:RouteOptions) {
    return this.createRoute("put", resource, path, options)
  }

  patch(resource:string, path:string, options:RouteOptions) {
    return this.createRoute("patch", resource, path, options)
  }

  delete(resource:string, path:string, options:RouteOptions) {
    return this.createRoute("delete", resource, path, options)
  }  

  createRoute(method:string, resource:string, path:string, options:RouteOptions):Route{

    if(!path) throw new Error("Missing path");
    
    if(!options) options = {};
    
    const routeDef = { method, resource, path, options }

    // save resource link
    const route = new Route(this, routeDef);

    this.routes.push(route);

    return route;

  }
  
  child(path:string,childRoutes:Routes):void{
    // concatenate the path to set root for child
    childRoutes.rootUrl = this.rootUrl.replace(/\/$/,"") + pathToTemplate(path);
    // bind to the router
    this.router.use(path,childRoutes.router);
  }

  static setACL(acl:ACLOptions){
    if(!acl.permissions) throw new Error("ACLOptions are missing permissions parameter");
    if(!acl.userRoles) throw new Error("ACLOptions are missing userRoles parameter");
    Object.assign(routesStore.acl,acl);
  }

  static setOptions(options):void{
    Object.assign(routesStore.options,options);
  }

}