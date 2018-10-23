import { WorkingEnvironment } from "./working-environment";

export class Development extends WorkingEnvironment {
    selectedImg: string;
    constructor(name:string, workLoadType:string, instanceType: string, instanceSize: string, selectedImg: string) {
        super(name, workLoadType, instanceType,instanceSize);
        this.selectedImg = selectedImg;
    }
}