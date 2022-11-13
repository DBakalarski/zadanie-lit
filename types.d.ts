export interface IData {
    variables: IVariablesItem[];
    results: IResultsItem[];
}
export interface IVariablesItem {
    name: string;
    values: (number | null)[];
}
export interface IResultsItem {
    name: string;
    values: IResultsItemValues;
}
export interface IResultsItemValues {
    equal: (number | null)[];
    formulaDefinition: string;
}
//# sourceMappingURL=types.d.ts.map