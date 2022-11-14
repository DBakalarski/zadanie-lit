import {LitElement, html, css} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {IResultsItem} from '../types';
import {minireset} from 'minireset.css/minireset.css.lit.js';
import {removeSpaces} from '../helper';

@customElement('formula-container')
export class FormulaContainer extends LitElement {
  static override styles = css`
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

  @query('#newFormulaName')
  formulaNameInput!: HTMLInputElement;

  @query('#newFormula')
  formulaInput!: HTMLInputElement;

  @property()
  results!: IResultsItem[];

  @property()
  removeFormula = (_formulaIndex: number) => {};

  @property()
  addFormula = (_formulaName: string, _formulaDefinition: string) => {};

  private _handleAddFormula() {
    if (
      this.formulaNameInput.value.trim() === '' ||
      this.formulaInput.value.trim() === ''
    ) {
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
    this.addFormula(
      removeSpaces(this.formulaNameInput.value),
      removeSpaces(this.formulaInput.value)
    );
    this.formulaNameInput.value = '';
    this.formulaInput.value = '';
  }

  private _handleRemoveFormula(index: number) {
    this.removeFormula(index);
  }

  override render() {
    return html`
      <div class="formula-container">
        <p class="title">Formula definition</p>
        <div class="row">
          <p>Formula name</p>
          <p>Initial Formula</p>
          <p>Action</p>
        </div>
        ${this.results.map(
          (item, index) =>
            html`<div class="row">
              <p>${item.name}</p>
              <p>${item.values.formulaDefinition}</p>
              <button @click=${() => this._handleRemoveFormula(index)}>
                remove
              </button>
            </div>`
        )}
        <div class="row">
          <input id="newFormulaName" />
          <input id="newFormula" />
          <button @click=${this._handleAddFormula}>Add</button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'formula-container': FormulaContainer;
  }
}
