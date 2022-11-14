import {LitElement, html, css} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {IVariablesItem} from '../types';
import {minireset} from 'minireset.css/minireset.css.lit.js';
import {removeSpaces, startsWithNumber} from '../helper';

@customElement('variables-container')
export class VariablesContainer extends LitElement {
  static override styles = css`
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

  @query('#newVariable')
  input!: HTMLInputElement;

  @property()
  variables!: IVariablesItem[];

  @property()
  removeVariable = (_variableIndex: number) => {};

  @property()
  addVariable = (_variableName: string) => {};

  private _handleAddVariable() {
    if (this.input.value.trim() === '') return;
    if (startsWithNumber(this.input.value.trim())) return;

    let itemExist = false;

    const inputValue = removeSpaces(this.input.value);

    this.variables.forEach((item) => {
      if (item.name === inputValue) {
        itemExist = true;
      }
    });

    if (itemExist) return;

    this.addVariable(inputValue);
    this.input.value = '';
  }

  private _handleRemoveVariable(index: number) {
    this.removeVariable(index);
  }

  override render() {
    return html`
      <div class="variables-container">
        <p class="title">Variable definition</p>
        <div class="row">
          <p>Variable name</p>
          <p>Action</p>
        </div>
        ${this.variables.map(
          (item, index) =>
            html`<div class="row">
              <p>${item.name}</p>
              <button @click=${() => this._handleRemoveVariable(index)}>
                remove
              </button>
            </div>`
        )}
        <div class="row">
          <input id="newVariable" />
          <button @click=${this._handleAddVariable}>Add</button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'variables-container': VariablesContainer;
  }
}
