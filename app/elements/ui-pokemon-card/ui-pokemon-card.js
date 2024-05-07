import { html } from 'lit-element';
import { CellsPage } from '@cells/cells-page';
import css from './ui-pokemon-card-styles'

export class UiPokemonCard extends CellsPage {
  static get is() {
    return 'ui-pokemon-card';
  }

  static styles = [ css ];

  static get properties() {
    return {
      pokemon: { type: String },
      id: { type: Number, attributes: false },
      name: { type: String, attributes: false },
      image: { type: String, attributes: false },
      type: { type: String, attributes: false },
      evolutions: { type: Number, attributes: false },
      index: { type: Number, attributes: false }
    };
  }

  constructor() {
    super();
    this.index = 0;
  }

  firstUpdated() {
    this._handleAssignData();
  }
//Este metodo se ejecuta cuando se monta el componente por primera vez y cuando se actualiza//

  updated() {
    this._handleAssignData();
  }
//

  _handleAssignData() {    
    const { evolutionNumber, id, image, name: pokemonName, type } = JSON.parse(this.pokemon)[this.index];
    this.id = id;
    this.name = pokemonName;
    this.image = image;
    this.type = type;
    this.evolutions = evolutionNumber;
  }
//Al extraer los pokemones obtenemos el Id, nombre, imagen y la evoluión//

  render() {
    if (this.id)
      return html `
        <div class="card-pokemon">
          <div class="card-title">
            <button 
              id="arrow-left"
              class="card-arrow"
              @click="${ () => this._handleChangeEvolution(false) }"
            >
              <img src="./resources/images/icons/arrow-left.png" alt="left-button" />
            </button>
            <p class="card-title-text">${ this.name }</p>              
            <button
              id="arrow-right"
              class="card-arrow"
              @click="${ () => this._handleChangeEvolution() }"
            >
              <img src="./resources/images/icons/arrow-right.png" alt="right-button" />
            </button>
          </div>
          <figure class="image-container">
            <img src="${ this.image }" class="pokemon-image" alt="${ this.name }" />
          </figure>
          <div class="info-container">
            <p>
              <strong>Tipo:</strong>
              ${ this.type }
            </p>
            <p>
              <strong>Evoluciones:</strong>
              ${ this.evolutions }
            </p>
          </div>
        </div>
      `;
  }
  
  _handleChangeEvolution(next = true) {
    if ((this.index + 1) === this.evolutions) {      
      this.dispatchEvent(new CustomEvent('modal-error', { bubbles: true, composed: true, detail: this.evolutions }));
    };
    if (next && (this.index === 0 || this.index === 1) && (this.index + 1) !== this.evolutions) {
      this.index++;
    } else if (!next && (this.index === 2 || this.index === 1)) {
      this.index--;
    }
  }
}
customElements.define(UiPokemonCard.is, UiPokemonCard);
