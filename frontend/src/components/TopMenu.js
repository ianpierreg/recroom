import React from "react";

<form onSubmit={this.handleSubmit}>
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <div className="title">Cadastro de imóvel</div>
              </div>
            </div>
          </div>

          <div className="columns is-multiline">
            <div className="column is-9">

              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Sobre a casa</label>
                </div>
                <div className="field-body">
                   <div className="field">
                    <p className="control is-expanded ">
                      <input className="input" type="number" placeholder="Pessoas"
                             name="people" value={this.state.people} onChange={this.handleChange}/>
                    </p>
                  </div>
                  <div className="field">
                    <p className="control is-expanded">
                      <input className="input" type="number" placeholder="Quartos"
                             name="rooms" value={this.state.rooms} onChange={this.handleChange}/>
                    </p>
                  </div>
                  <div className="field">
                    <p className="control is-expanded ">
                      <input className="input" type="number" placeholder="Banheiros"
                             name="bathrooms" value={this.state.bathrooms} onChange={this.handleChange}/>
                    </p>
                  </div>
                  <div className="field">
                    <p className="control is-expanded ">
                      <input className="input" type="number" placeholder="Tamanho (m²)"
                             name="size" value={this.state.size} onChange={this.handleChange}/>
                    </p>
                  </div>
                </div>
              </div>

              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Endereço</label>
                </div>
                <div className="field-body columns">
                    <div className="field column remove-padding">
                      <p className="control is-expanded">
                        <input className="input" type="text" placeholder="CEP"
                               name="zipcode" value={this.state.zipcode} onChange={this.handleChange}/>
                      </p>
                    </div>
                    <div className="field column remove-padding">
                        <p className="control is-expanded">
                          <input className="input" type="text" placeholder="UF"
                                 name="state" value={this.state.state} onChange={this.handleChange}/>
                        </p>
                    </div>
                    <div className="field column is-two-thirds remove-padding">
                        <p className="control is-expanded">
                          <input className="input" type="text" placeholder="Cidade"
                          name="city" value={this.state.city} onChange={this.handleChange}/>
                        </p>
                    </div>
                </div>
              </div>


              <div className="field is-horizontal">
                <div className="field-label"></div>
                <div className="field-body">
                  <div className="field">
                    <p className="control is-expanded">
                      <input className="input" type="text" placeholder="Bairro" name="neighborhood" value={this.state.neighborhood} onChange={this.handleChange}/>
                    </p>
                  </div>
                </div>
              </div>

              <div className="field is-horizontal">
                <div className="field-label"></div>
                <div className="field-body">
                  <div className="field">
                    <p className="control is-expanded">
                      <input className="input" type="text" placeholder="Rua" name="street" value={this.state.street} onChange={this.handleChange}/>
                    </p>
                  </div>
                </div>
              </div>

              <div className="field is-horizontal">
                <div className="field-label"></div>
                <div className="field-body">
                  <div className="field">
                    <p className="control is-expanded">
                      <input className="input" type="number" placeholder="Número" name="number" value={this.state.number} onChange={this.handleChange}/>
                    </p>
                  </div>
                  <div className="field">
                    <p className="control is-expanded">
                      <input className="input" type="text" placeholder="Complemento" name="complement" value={this.state.complement} onChange={this.handleChange}/>
                    </p>
                  </div>
                </div>
              </div>
              {this.renderAmenities()}
              {this.renderFurnitures()}
            </div>
          </div>
          <div className="control">
            <button type="submit" className="button is-primary is-medium">
              Cadastrar imóvel
            </button>
          </div>
        </form>