export class SearchCriteria {
    public filters: any;
    public searchText: any; // variable used for free text search
    public dateFilters: any;
}
export class Filter {
    public type: any; // used to verify whether the type of filter is checkbox or date range
    public displayValue: string;
    public property: string;
    public filterable: any;
    public selected = false;
    public valuesList: Option[] = [];
    public searchTerm: any;
}
export class Option {
    public key: any; // indicates the property
    public value: any;
    public from: any;
    public to: any;
    public selected = false;
}
