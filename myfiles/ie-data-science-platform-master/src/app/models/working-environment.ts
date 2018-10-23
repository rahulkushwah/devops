import { IEnvironment } from "./IEvironment";

export class WorkingEnvironment implements IEnvironment {
    name: string;
    workLoadType: string;
    instanceType: string;
    instanceSize: string;
    constructor (name:string, workLoadType:string, instanceType: string, instanceSize: string) {
        this.name = name;
        this.workLoadType = workLoadType;
        this.instanceType = instanceType;
        this.instanceSize = instanceSize;
    }
}