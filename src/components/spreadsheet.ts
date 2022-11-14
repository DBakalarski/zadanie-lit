import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import {minireset} from 'minireset.css/minireset.css.lit.js';
import {IData} from '../types';

@customElement('spreadsheet-element')
export class SpreadsheetElement extends LitElement {
  static override styles = css`
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

  @property()
  data!: IData;

  @property()
  hamdleAddRow = () => {};

  @property()
  changeInput = (_value: string, _indexRow: number, _indexColum: number) => {};

  private _handleInputChange = (
    e: Event,
    indexRow: number,
    indexColum: number
  ) => {
    const input = e.target as HTMLInputElement;
    this.changeInput(input.value, indexRow, indexColum);
  };

  private _transformFormulaToResult(
    formulaDefinition: string,
    indexRow: number
  ) {
    let formula = formulaDefinition;
    const variablesName = this.data.variables.map((variable) => variable.name);
    const formulaArray = formula
      .split('+')
      .join(',')
      .split('-')
      .join(',')
      .split(',');
    if (formula.includes(' ')) {
      return '';
    }

    formulaArray.forEach((item) => {
      if (variablesName.includes(item)) {
        const indexColumn = this.data.variables.findIndex(
          (variable) => variable.name == item
        );
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

  private _handleAddRow() {
    this.hamdleAddRow();
  }

  override render() {
    return html`
      <div class="spreadsheet-container">
        <p>spread sheet</p>
        <div class="spreadsheet">
          <div class="spreadsheet-left">
            ${this.data.variables.map(
              (variable, indexColum) => html`
                <div class="single-column">
                  <p>${variable.name}</p>
                  ${variable.values.map(
                    (value, indexRow) =>
                      html`<input
                        .value=${value}
                        @input=${(e: Event) =>
                          this._handleInputChange(e, indexRow, indexColum)}
                        type="number"
                      />`
                  )}
                </div>
              `
            )}
          </div>
          <div class="spreadsheet-right">
            ${this.data.results.map(
              (result, indexColum) => html`
                <div class="single-column">
                  <p>${result.name}</p>
                  ${result.values.equal.map(
                    (value, indexRow) =>
                      html`<span
                          >${this._transformFormulaToResult(
                            value,
                            indexRow
                          )}</span
                        >
                        <!-- <span>${result.values.formulaDefinition}</span> -->
                        <!-- <span>indexColum ${indexColum}</span>
                        <span>indexRow ${indexRow}</span>  --> `
                  )}
                </div>
              `
            )}
          </div>
        </div>
        <button @click=${this._handleAddRow}>Add row</button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'spreadsheet-element': SpreadsheetElement;
  }
}
