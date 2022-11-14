import { LitElement } from 'lit';
import { IData, IResultsItem } from '../types';
export declare class SpreadsheetElement extends LitElement {
    static styles: import("lit").CSSResult;
    data: IData;
    hamdleAddRow: () => void;
    changeInput: (_value: string, _indexRow: number, _indexColum: number) => void;
    handleChangeActiveFormula: (_value: string, _name: string) => void;
    isFormulaEdit: boolean;
    activeResult: IResultsItem | undefined;
    editFormulaInput: HTMLInputElement;
    private _handleInputChange;
    private _transformFormulaToResult;
    private _handleAddRow;
    private _handleEditFormula;
    private _handleChangeActiveFormula;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'spreadsheet-element': SpreadsheetElement;
    }
}
//# sourceMappingURL=spreadsheet.d.ts.map