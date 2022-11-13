import { LitElement } from 'lit';
import './components/variables-container';
import './components/formula-container';
export declare class MainElement extends LitElement {
    static styles: import("lit").CSSResult;
    private _data;
    private _handleAddVariable;
    private _handleRemoveVariable;
    private _handleAddFormula;
    private _handleRemoveFormula;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'main-element': MainElement;
    }
}
//# sourceMappingURL=main-element.d.ts.map