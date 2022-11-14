import {LitElement, html, css} from 'lit';
import {customElement, property, query, state} from 'lit/decorators.js';

import {minireset} from 'minireset.css/minireset.css.lit.js';
import {IData, IResultsItem} from '../types';

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

  @property()
  handleChangeActiveFormula = (_value: string) => {};

  @state()
  isFormulaEdit = false;

  @state()
  activeResult: IResultsItem | undefined;

  @query('#editFormula')
  editFormulaInput!: HTMLInputElement;

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

  private _handleEditFormula(result: IResultsItem) {
    console.log('click', result.values.formulaDefinition);
    this.isFormulaEdit = !this.isFormulaEdit;
    this.activeResult = result;
  }

  private _handleChangeActiveFormula() {
    console.log(this.activeResult);
    this.handleChangeActiveFormula(this.editFormulaInput.value);
  }

  override render() {
    return html`
      <div class="spreadsheet-container">
        <p>spread sheet</p>
        <div ?hidden=${!this.isFormulaEdit}>
          ${this.activeResult?.name}
          <input
            id="editFormula"
            .value=${this.activeResult?.values.formulaDefinition ?? ''}
          />
          <button @click=${this._handleChangeActiveFormula}>confirm</button>
        </div>
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
              (result) => html`
                <div class="single-column">
                  <p @click=${() => this._handleEditFormula(result)}>
                    ${result.name}
                  </p>
                  ${result.values.equal.map(
                    (value, indexRow) =>
                      html`<span
                        >${this._transformFormulaToResult(
                          value,
                          indexRow
                        )}</span
                      > `
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
