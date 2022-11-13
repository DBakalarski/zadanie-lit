import { LitElement } from 'lit';
import { IVariablesItem } from '../types';
export declare class VariablesContainer extends LitElement {
    static styles: import("lit").CSSResult;
    input: HTMLInputElement;
    variables: IVariablesItem[];
    removeVariable: (_variableIndex: number) => void;
    addVariable: (_variableName: string) => void;
    private _handleAddVariable;
    private _handleRemoveVariable;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'variables-container': VariablesContainer;
    }
}
//# sourceMappingURL=variables-container.d.ts.map