export class NewUser {
    username: string;
    userId: string;
    email: string;
    group: string;
    s3bucketlist: any[];
    constructor(username: string, userId: string, email: string, group: string, s3bucketlist: any[]) {
        this.username = username;
        this.userId = userId;
        this.email = email;
        this.group = group;
        this.s3bucketlist = s3bucketlist;
    }
}