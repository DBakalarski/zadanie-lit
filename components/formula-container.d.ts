import { LitElement } from 'lit';
import { IResultsItem } from '../types';
export declare class FormulaContainer extends LitElement {
    static styles: import("lit").CSSResult;
    formulaNameInput: HTMLInputElement;
    formulaInput: HTMLInputElement;
    results: IResultsItem[];
    removeFormula: (_formulaIndex: number) => void;
    addFormula: (_formulaName: string, _formulaDefinition: string) => void;
    private _handleAddFormula;
    private _handleRemoveFormula;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'formula-container': FormulaContainer;
    }
}
//# sourceMappingURL=formula-container.d.ts.map