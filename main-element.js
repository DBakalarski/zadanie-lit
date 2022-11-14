var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { minireset } from 'minireset.css/minireset.css.lit.js';
import './components/variables-container';
import './components/formula-container';
import './components/spreadsheet';
let MainElement = class MainElement extends LitElement {
    constructor() {
        super(...arguments);
        this._data = { variables: [], results: [] };
        this._isSpreadsheetVisibile = false;
    }
    _handleAddVariable(variableName) {
        const newData = { ...this._data };
        newData.variables.push({ name: variableName, values: [] });
        this._data = newData;
    }
    _handleRemoveVariable(index) {
        const newData = { ...this._data };
        newData.variables = newData.variables.filter((_, i) => i !== index);
        this._data = newData;
    }
    _handleAddFormula(formulaName, formulaDefinition) {
        const newData = { ...this._data };
        newData.results.push({
            name: formulaName,
            values: { equal: [], formulaDefinition },
        });
        // const newEquals = newData.results[index].values.equal.map(() => value);
        this._data = newData;
    }
    _handleRemoveFormula(index) {
        const newData = { ...this._data };
        newData.results = newData.results.filter((_, i) => i !== index);
        this._data = newData;
    }
    _handeChangeValueSpreadSheet(value, indexRow, indexColum) {
        const newData = { ...this._data };
        newData.variables[indexColum].values[indexRow] = value;
        this._data = newData;
    }
    _handleAddEmptyRow() {
        const newData = { ...this._data };
        newData.variables.forEach((_, index) => newData.variables[index].values.push(''));
        newData.results.forEach((_, index) => newData.results[index].values.equal.push(newData.results[index].values.formulaDefinition));
        this._data = newData;
    }
    _handleChangeFormula(value, name) {
        const newData = { ...this._data };
        const index = newData.results.findIndex((result) => result.name === name);
        const newEquals = newData.results[index].values.equal.map(() => value);
        newData.results[index].values.formulaDefinition = value;
        newData.results[index].values.equal = newEquals;
        this._data = newData;
    }
    _handleShowSpreadshet() {
        this._isSpreadsheetVisibile = true;
        this._handleAddEmptyRow();
    }
    render() {
        return html `
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
};
MainElement.styles = css `
    ${minireset}
    .main-container {
      display: flex;
      padding: 20px;
    }
  `;
__decorate([
    state()
], MainElement.prototype, "_data", void 0);
__decorate([
    state()
], MainElement.prototype, "_isSpreadsheetVisibile", void 0);
MainElement = __decorate([
    customElement('main-element')
], MainElement);
export { MainElement };
//# sourceMappingURL=main-element.js.map