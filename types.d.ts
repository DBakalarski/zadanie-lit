export interface IData {
    variables: IVariablesItem[];
    results: IResultsItem[];
}
export interface IVariablesItem {
    name: string;
    values: string[];
}
export interface IResultsItem {
    name: string;
    values: IResultsItemValues;
}
export interface IResultsItemValues {
    equal: string[];
    formulaDefinition: string;
}
//# sourceMappingURL=types.d.ts.map