export class MenuModel {
    private name: String;
    private url: string;
    private icon: string;
    private type: string;
    private privilege: string;

    constructor(name: string, url: string, icon: string, type: string, privilege: string) {
        this.name = name;
        this.url = url;
        this.icon = icon;
        this.type = type;
        this.privilege = privilege;
    }

}
