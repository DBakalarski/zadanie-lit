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
const sampleData = {
    variables: [
        { name: 'var1', values: ['1', '2'] },
        { name: 'var2', values: ['3', '4'] },
        { name: 'var3', values: ['5', '6'] },
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
let MainElement = class MainElement extends LitElement {
    constructor() {
        super(...arguments);
        this._data = sampleData;
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
        console.log('nw', newData);
    }
    handleTestData() {
        console.log('data', this._data);
    }
    render() {
        return html `
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
      ></spreadsheet-element>
      <button @click=${this.handleTestData}>Check data</button>
    `;
    }
};
MainElement.styles = css `
    ${minireset}
  `;
__decorate([
    state()
], MainElement.prototype, "_data", void 0);
MainElement = __decorate([
    customElement('main-element')
], MainElement);
export { MainElement };
//# sourceMappingURL=main-element.js.map