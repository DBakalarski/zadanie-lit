var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { minireset } from 'minireset.css/minireset.css.lit.js';
import { removeSpaces } from '../helper';
let FormulaContainer = class FormulaContainer extends LitElement {
    constructor() {
        super(...arguments);
        this.removeFormula = (_formulaIndex) => { };
        this.addFormula = (_formulaName, _formulaDefinition) => { };
    }
    _handleAddFormula() {
        if (this.formulaNameInput.value.trim() === '' ||
            this.formulaInput.value.trim() === '') {
            return;
        }
        let itemExist = false;
        this.results.forEach((item) => {
            if (item.name === removeSpaces(this.formulaNameInput.value)) {
                itemExist = true;
            }
        });
        if (itemExist) {
            return;
        }
        this.addFormula(removeSpaces(this.formulaNameInput.value), removeSpaces(this.formulaInput.value));
        this.formulaNameInput.value = '';
        this.formulaInput.value = '';
    }
    _handleRemoveFormula(index) {
        this.removeFormula(index);
    }
    render() {
        return html `
      <div class="formula-container">
        <p class="title">Formula definition</p>
        <div class="row">
          <p>Formula name</p>
          <p>Initial Formula</p>
          <p>Action</p>
        </div>
        ${this.results.map((item, index) => html `<div class="row">
              <p>${item.name}</p>
              <p>${item.values.formulaDefinition}</p>
              <button @click=${() => this._handleRemoveFormula(index)}>
                remove
              </button>
            </div>`)}
        <div class="row">
          <input id="newFormulaName" />
          <input id="newFormula" />
          <button @click=${this._handleAddFormula}>Add</button>
        </div>
      </div>
    `;
    }
};
FormulaContainer.styles = css `
    ${minireset}

    .formula-container {
      margin-left: 40px;
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
    query('#newFormulaName')
], FormulaContainer.prototype, "formulaNameInput", void 0);
__decorate([
    query('#newFormula')
], FormulaContainer.prototype, "formulaInput", void 0);
__decorate([
    property()
], FormulaContainer.prototype, "results", void 0);
__decorate([
    property()
], FormulaContainer.prototype, "removeFormula", void 0);
__decorate([
    property()
], FormulaContainer.prototype, "addFormula", void 0);
FormulaContainer = __decorate([
    customElement('formula-container')
], FormulaContainer);
export { FormulaContainer };
//# sourceMappingURL=formula-container.js.map