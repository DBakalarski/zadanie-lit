import {LitElement, html, css} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {minireset} from 'minireset.css/minireset.css.lit.js';
import './components/variables-container';
import './components/formula-container';
import './components/spreadsheet';
import {IData} from './types';

@customElement('main-element')
export class MainElement extends LitElement {
  static override styles = css`
    ${minireset}
    .main-container {
      display: flex;
      padding: 20px;
    }
  `;

  @state()
  private _data: IData = {variables: [], results: []};

  @state()
  private _isSpreadsheetVisibile = false;

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
    // const newEquals = newData.results[index].values.equal.map(() => value);
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

  private _handleChangeFormula(value: string, name: string) {
    const newData = {...this._data};
    const index = newData.results.findIndex((result) => result.name === name);
    const newEquals = newData.results[index].values.equal.map(() => value);

    newData.results[index].values.formulaDefinition = value;
    newData.results[index].values.equal = newEquals;

    this._data = newData;
  }

  private _handleShowSpreadshet() {
    this._isSpreadsheetVisibile = true;
    this._handleAddEmptyRow();
  }

  override render() {
    return html`
      <div class="main-container">
        <variables-container
          ?hidden=${this._isSpreadsheetVisibile}
          .variables=${this._data.variables}
          .addVariable=${this._handleAddVariable.bind(this)}
          .removeVariable=${this._handleRemoveVariable.bind(this)}
        ></variables-container>
        <formula-container
          ?hidden=${this._isSpreadsheetVisibile}
          .results=${this._data.results}
          .addFormula=${this._handleAddFormula.bind(this)}
          .removeFormula=${this._handleRemoveFormula.bind(this)}
        >
        </formula-container>
      </div>

      <button
        @click=${this._handleShowSpreadshet}
        ?hidden=${this._isSpreadsheetVisibile}
      >
        Generate spreadsheets
      </button>
      <spreadsheet-element
        ?hidden=${!this._isSpreadsheetVisibile}
        .data=${this._data}
        .changeInput=${this._handeChangeValueSpreadSheet.bind(this)}
        .hamdleAddRow=${this._handleAddEmptyRow.bind(this)}
        .handleChangeActiveFormula=${this._handleChangeFormula.bind(this)}
      ></spreadsheet-element>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'main-element': MainElement;
  }
}
