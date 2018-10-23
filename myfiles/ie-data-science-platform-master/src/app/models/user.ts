export class User {
    id: string;
    name: string;
    role: string;

    constructor(id,name,role) {
        this.id = id;
        this.name = name;
        this.role = role;
    }
}