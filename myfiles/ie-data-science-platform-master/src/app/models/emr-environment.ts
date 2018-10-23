import { WorkingEnvironment } from "./working-environment";

export class Emr extends WorkingEnvironment {
    numberOfNodes: string;
    constructor(name:string, workLoadType:string, instanceType: string, instanceSize: string, numberOfNodes: string) {
        super(name, workLoadType, instanceType,instanceSize);
        this.numberOfNodes = numberOfNodes;
    }
}