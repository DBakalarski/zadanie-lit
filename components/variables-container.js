var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { minireset } from 'minireset.css/minireset.css.lit.js';
import { removeSpaces, startsWithNumber } from '../helper';
let VariablesContainer = class VariablesContainer extends LitElement {
    constructor() {
        super(...arguments);
        this.removeVariable = (_variableIndex) => { };
        this.addVariable = (_variableName) => { };
    }
    _handleAddVariable() {
        if (this.input.value.trim() === '')
            return;
        if (startsWithNumber(this.input.value.trim()))
            return;
        let itemExist = false;
        const inputValue = removeSpaces(this.input.value);
        this.variables.forEach((item) => {
            if (item.name === inputValue) {
                itemExist = true;
            }
        });
        if (itemExist)
            return;
        this.addVariable(inputValue);
        this.input.value = '';
    }
    _handleRemoveVariable(index) {
        this.removeVariable(index);
    }
    render() {
        return html `
      <div class="variables-container">
        <p class="title">Variable definition</p>
        <div class="row">
          <p>Variable name</p>
          <p>Action</p>
        </div>
        ${this.variables.map((item, index) => html `<div class="row">
              <p>${item.name}</p>
              <button @click=${() => this._handleRemoveVariable(index)}>
                remove
              </button>
            </div>`)}
        <div class="row">
          <input id="newVariable" />
          <button @click=${this._handleAddVariable}>Add</button>
        </div>
      </div>
    `;
    }
};
VariablesContainer.styles = css `
    ${minireset}
    .variables-container {
      display: flex;
      flex-direction: column;
    }
    .row {
      display: flex;
      margin: 4px 0;
      justify-content: space-between;
    }

    .title {
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 10px;
    }
  `;
__decorate([
    query('#newVariable')
], VariablesContainer.prototype, "input", void 0);
__decorate([
    property()
], VariablesContainer.prototype, "variables", void 0);
__decorate([
    property()
], VariablesContainer.prototype, "removeVariable", void 0);
__decorate([
    property()
], VariablesContainer.prototype, "addVariable", void 0);
VariablesContainer = __decorate([
    customElement('variables-container')
], VariablesContainer);
export { VariablesContainer };
//# sourceMappingURL=variables-container.js.map