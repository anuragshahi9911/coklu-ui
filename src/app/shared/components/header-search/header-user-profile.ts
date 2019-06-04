export class UserProfileItem {
    private name: string;
    private url: string;
    private logo: string;

    constructor(name: string, url: string, logo: string) {
        this.name = name;
        this.url = url;
        this.logo = logo;
    }
}
export class SettingItem {
    private icon: string;
    private url: string;

    constructor(icon: string, url: string) {
        this.icon = icon;
        this.url = url;
    }
}
