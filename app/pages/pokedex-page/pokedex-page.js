import { CellsPage } from "@cells/cells-page";
import { BbvaCoreIntlMixin } from "@bbva-web-components/bbva-core-intl-mixin";
import { html } from "lit-element";

import "@cells-components/cells-template-paper-drawer-panel";
import "@bbva-web-components/bbva-header-main";

import css from "./pokedex-page-styles";

import "../../elements/bgadp-pokeapi-dm/bgadp-pokeapi-dm";
import "../../elements/ui-modal-error/ui-modal-error";
import "../../elements/ui-pokemon-card/ui-pokemon-card";

/* eslint-disable new-cap */
class PokedexPage extends BbvaCoreIntlMixin(CellsPage) {
  static get is() {
    return "pokedex-page";
  }

  static get properties() {
    return {
      pokemons: { type: Array },
    };
  }

  constructor() {
    super();
    this.pokemons = [];
  }
//En este constructor se está creando una propiedad vacía para agregar los pokemones//

  async firstUpdated() {
    this.pokeApiDm = this.shadowRoot.querySelector("#pokeapi-data");
    this.modalError = this.shadowRoot.querySelector("#modal-error");
    this.pokemons = await this.pokeApiDm.getPokemons();
  }
//El método fistUpdate es un ciclo de vida del componente//

  render() {
    return html` <cells-template-paper-drawer-panel mode="seamed">
      <div slot="app__header">
        <h1 class="header-title">PokeDex</h1>
      </div>

      <div slot="app__main" class="container">
        <nav class="nav-pokemon">
          <button @click="${this._handlePrevPage}">Preview</button>
          <button @click="${this._handleNextPage}">Next</button>
        </nav>
        ${this.pokemons?.length === 0
          ? html` <strong>Cargando...</strong> `
          : ""}
        ${this.pokemons.map(
          (pokemon) => html`
            <ui-pokemon-card
              pokemon="${ JSON.stringify(pokemon) }"
              @modal-error="${ this._handleOpenErrorModal }"
            >
            </ui-pokemon-card>
          `
        )}
        <ui-modal-error id="modal-error"></ui-modal-error>
      </div>
      <bgadp-pokeapi-dm id="pokeapi-data"></bgadp-pokeapi-dm>
    </cells-template-paper-drawer-panel>`;
  }
//Con lo anterior obtenemos las opciones de buscar más pokemones//

  async _handlePrevPage() {
    await this._handleLoadPokemons("previous");
  }

  async _handleNextPage() {
    await this._handleLoadPokemons("next");
  }

  async _handleLoadPokemons(key = "") {
    if (this.pokeApiDm[key] === null) {
      return;
    }
    this.pokemons = [];
    this.pokeApiDm.url = this.pokeApiDm[key];
    this.pokemons = await this.pokeApiDm.getPokemons();
  }

  _handleOpenErrorModal(e) {
    if (e.detail === 1) {
      this.modalError.style.display = "block";
    }
  }

  static get styles() {
    return [css];
  }
}

window.customElements.define(PokedexPage.is, PokedexPage);
