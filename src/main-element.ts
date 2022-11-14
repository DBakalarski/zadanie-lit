import {LitElement, html, css} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {minireset} from 'minireset.css/minireset.css.lit.js';
import './components/variables-container';
import './components/formula-container';
import './components/spreadsheet';
import {IData} from './types';

const sampleData: IData = {
  variables: [
    {name: 'var1', values: ['1', '2']},
    {name: 'var2', values: ['3', '4']},
    {name: 'var3', values: ['5', '6']},
  ],

  results: [
    {
      name: 'cof',
      values: {
        equal: ['var1+var2+5', 'var1+var2+5'],
        formulaDefinition: 'var1+var2+5',
      },
    },
    {
      name: 'cof2',
      values: {
        equal: ['var1+var2+var3', 'var1+var2+var3'],
        formulaDefinition: 'var1+var2+var3',
      },
    },
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

  private _handeChangeValueSpreadSheet(
    value: string,
    indexRow: number,
    indexColum: number
  ) {
    const newData = {...this._data};
    newData.variables[indexColum].values[indexRow] = value;
    this._data = newData;
  }

  private _handleAddEmptyRow() {
    const newData = {...this._data};
    newData.variables.forEach((_, index) =>
      newData.variables[index].values.push('')
    );

    newData.results.forEach((_, index) =>
      newData.results[index].values.equal.push(
        newData.results[index].values.formulaDefinition
      )
    );

    this._data = newData;
  }

  private _handleChangeFormula(value: string) {
    console.log('_handleChangeFormula', value);
  }

  private handleTestData() {
    console.log('data', this._data);
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
      <spreadsheet-element
        .data=${this._data}
        .changeInput=${this._handeChangeValueSpreadSheet.bind(this)}
        .hamdleAddRow=${this._handleAddEmptyRow.bind(this)}
        .handleChangeActiveFormula=${this._handleChangeFormula.bind(this)}
      ></spreadsheet-element>
      <button @click=${this.handleTestData}>Check data</button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'main-element': MainElement;
  }
}
