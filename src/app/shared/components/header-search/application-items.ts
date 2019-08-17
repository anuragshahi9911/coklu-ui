export class ApplicationItem {
    private name: string;
    private url: string;
    private logo: string;
    private privilege: string;

    constructor(name: string, url: string, logo: string, privilege: string) {
        this.name = name;
        this.url = url;
        this.logo = logo;
        this.privilege = privilege;
    }
}
