import {LitElement, html, css} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {IVariablesItem} from '../types';
import {minireset} from 'minireset.css/minireset.css.lit.js';

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
    }
    .row p {
      margin-right: 10px;
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
    this.addVariable(this.input.value);
    this.input.value = '';
  }
  private _handleRemoveVariable(index: number) {
    this.removeVariable(index);
  }

  override render() {
    return html`
      <div class="variables-container">
        <p>Variable definition</p>
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
