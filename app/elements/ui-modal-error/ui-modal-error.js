import { html } from 'lit-element';
import { CellsPage } from '@cells/cells-page';

import css from './ui-modal-error-styles';

export class UiModalError extends CellsPage {
  static get is() {
    return 'ui-modal-error';
  }

  static styles = [ css ];

  constructor() {
    super();
  }

  render() {
    return html `
      <article class="container">
        <h2 class="modal-title">¡Lo sentimos!</h2>
        <p class="modal-message">
          Este pokemon solamente cuenta con 1 evolución.</p>
        <button
          class="modal-close"
          @click="${ this._handleCloseModal }"
        >Aceptar</button>
      </article>
    `;
  }

  _handleCloseModal() {
    this.style.display = "none";
  }

}
customElements.define(UiModalError.is, UiModalError);
