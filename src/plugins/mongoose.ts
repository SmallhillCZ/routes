import { RoutesACL } from "../acl";

import * as express from "express";

export function RoutesPluginsMongoose(schema){

  schema.query.permission = function(permission:string,req:express.Request,throwError:boolean){
    
    const aclResult = RoutesACL.can(permission,req);
    
    if(!aclResult.allowed){
      if(throwError) {
        console.log("throw");
        throw new Error("Unauthorized");
      }
      else this.where({nonexistentrouteswherevariable:5});
    }
    if(aclResult.filters.length) this.where({ $or: aclResult.filters });
    
    return this;
  };
  
};