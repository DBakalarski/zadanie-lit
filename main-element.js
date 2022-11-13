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
const sampleData = {
    variables: [
        { name: 'var1', values: [2, 4] },
        { name: 'var2', values: [2, null] },
    ],
    results: [
        { name: 'cof', values: { equal: [5, 5], formulaDefinition: 'var1+var2' } },
        { name: 'cof2', values: { equal: [4, 5], formulaDefinition: 'var4+var2' } },
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