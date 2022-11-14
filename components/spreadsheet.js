var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { minireset } from 'minireset.css/minireset.css.lit.js';
let SpreadsheetElement = class SpreadsheetElement extends LitElement {
    constructor() {
        super(...arguments);
        this.hamdleAddRow = () => { };
        this.changeInput = (_value, _indexRow, _indexColum) => { };
        this._handleInputChange = (e, indexRow, indexColum) => {
            const input = e.target;
            this.changeInput(input.value, indexRow, indexColum);
        };
    }
    _transformFormulaToResult(formulaDefinition, indexRow) {
        let formula = formulaDefinition;
        // console.log('formula', formula);
        const variablesName = this.data.variables.map((variable) => variable.name);
        // console.log('variablesName', variablesName);
        const formulaArray = formula
            .split('+')
            .join(',')
            .split('-')
            .join(',')
            .split(',');
        // console.log('formulaArray', formulaArray);
        console.log('formula', formula);
        console.log('formulaArray', formulaArray);
        if (formula.includes(' ')) {
            return '';
        }
        formulaArray.forEach((item) => {
            if (variablesName.includes(item)) {
                const indexColumn = this.data.variables.findIndex((variable) => variable.name == item);
                const value = this.data.variables[indexColumn].values[indexRow];
                if (!value) {
                    formula = formula.replace(item, '0');
                }
                formula = formula.replace(item, value);
            }
            return 0;
        });
        return eval(formula);
    }
    _handleAddRow() {
        this.hamdleAddRow();
    }
    render() {
        return html `
      <div class="spreadsheet-container">
        <p>spread sheet</p>
        <div class="spreadsheet">
          <div class="spreadsheet-left">
            ${this.data.variables.map((variable, indexColum) => html `
                <div class="single-column">
                  <p>${variable.name}</p>
                  ${variable.values.map((value, indexRow) => html `<input
                        .value=${value}
                        @input=${(e) => this._handleInputChange(e, indexRow, indexColum)}
                        type="number"
                      />`)}
                </div>
              `)}
          </div>
          <div class="spreadsheet-right">
            ${this.data.results.map((result, indexColum) => html `
                <div class="single-column">
                  <p>${result.name}</p>
                  ${result.values.equal.map((value, indexRow) => html `<span
                          >${this._transformFormulaToResult(value, indexRow)}</span
                        >
                        <!-- <span>${result.values.formulaDefinition}</span> -->
                        <!-- <span>indexColum ${indexColum}</span>
                        <span>indexRow ${indexRow}</span>  --> `)}
                </div>
              `)}
          </div>
        </div>
        <button @click=${this._handleAddRow}>Add row</button>
      </div>
    `;
    }
};
SpreadsheetElement.styles = css `
    ${minireset}
    .spreadsheet-container {
      margin-top: 50px;
    }

    .single-column {
      display: flex;
      flex-direction: column;
      min-width: 100px;
      align-items: center;
      margin-top: 20px;
    }

    .spreadsheet {
      display: flex;
    }

    .spreadsheet-left {
      display: flex;
    }
    .spreadsheet-right {
      display: flex;
    }
  `;
__decorate([
    property()
], SpreadsheetElement.prototype, "data", void 0);
__decorate([
    property()
], SpreadsheetElement.prototype, "hamdleAddRow", void 0);
__decorate([
    property()
], SpreadsheetElement.prototype, "changeInput", void 0);
SpreadsheetElement = __decorate([
    customElement('spreadsheet-element')
], SpreadsheetElement);
export { SpreadsheetElement };
//# sourceMappingURL=spreadsheet.js.map