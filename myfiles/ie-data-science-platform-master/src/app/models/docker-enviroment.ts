import { WorkingEnvironment } from "./working-environment";

export class Docker extends WorkingEnvironment {
    selectedImg: string;
    numberOfNodes: string;
    constructor(name:string, workLoadType:string, instanceType: string, 
        instanceSize: string, selectedImg: string, numberOfNodes: string) {
            super(name, workLoadType, instanceType,instanceSize);
            this.selectedImg = selectedImg;
            this.numberOfNodes = numberOfNodes;
    }
}