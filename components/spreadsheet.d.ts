import { LitElement } from 'lit';
import { IData } from '../types';
export declare class SpreadsheetElement extends LitElement {
    static styles: import("lit").CSSResult;
    data: IData;
    hamdleAddRow: () => void;
    changeInput: (_value: string, _indexRow: number, _indexColum: number) => void;
    private _handleInputChange;
    private _transformFormulaToResult;
    private _handleAddRow;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'spreadsheet-element': SpreadsheetElement;
    }
}
//# sourceMappingURL=spreadsheet.d.ts.map