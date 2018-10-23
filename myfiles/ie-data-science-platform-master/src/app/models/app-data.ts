import { File } from "./data-objects/file";

export class AppData {
    clusters: any;
    globalFiles: any;
    userFiles: any;
    users: any;
    allClusters: any;
    logs: any;

    constructor(clusters, globalFiles, userFiles, users, allClusters, logs) {
        this.clusters = clusters;
        this.globalFiles = globalFiles;
        this.userFiles = userFiles;
        this.users = users;
        this.allClusters = allClusters;
        this.logs = logs;
    }
}