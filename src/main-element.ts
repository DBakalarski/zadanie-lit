import {LitElement, html, css} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {minireset} from 'minireset.css/minireset.css.lit.js';
import './components/variables-container';
import './components/formula-container';
import {IData} from './types';

const sampleData: IData = {
  variables: [
    {name: 'var1', values: [2, 4]},
    {name: 'var2', values: [2, null]},
  ],

  results: [
    {name: 'cof', values: {equal: [5, 5], formulaDefinition: 'var1+var2'}},
    {name: 'cof2', values: {equal: [4, 5], formulaDefinition: 'var4+var2'}},
  ],
};

@customElement('main-element')
export class MainElement extends LitElement {
  static override styles = css`
    ${minireset}
  `;

  @state()
  private _data: IData = sampleData;

  private _handleAddVariable(variableName: string) {
    const newData = {...this._data};
    newData.variables.push({name: variableName, values: []});
    this._data = newData;
  }
  private _handleRemoveVariable(index: number) {
    const newData = {...this._data};
    newData.variables = newData.variables.filter((_, i) => i !== index);
    this._data = newData;
  }

  private _handleAddFormula(formulaName: string, formulaDefinition: string) {
    const newData = {...this._data};
    newData.results.push({
      name: formulaName,
      values: {equal: [], formulaDefinition},
    });
    this._data = newData;
  }

  private _handleRemoveFormula(index: number) {
    const newData = {...this._data};
    newData.results = newData.results.filter((_, i) => i !== index);
    this._data = newData;
  }

  override render() {
    return html`
      <variables-container
        .variables=${this._data.variables}
        .addVariable=${this._handleAddVariable.bind(this)}
        .removeVariable=${this._handleRemoveVariable.bind(this)}
      ></variables-container>
      <formula-container
        .results=${this._data.results}
        .addFormula=${this._handleAddFormula.bind(this)}
        .removeFormula=${this._handleRemoveFormula.bind(this)}
      >
      </formula-container>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'main-element': MainElement;
  }
}
