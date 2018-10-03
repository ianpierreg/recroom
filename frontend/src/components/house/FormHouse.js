import React from "react"
import { render } from "react-dom"
import '../../../static/frontend/css/common.css'
import AmenityContainer from "./AmenityContainer";
import FurnitureContainer from "./FurnitureContainer";

export default class FormHouse extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      people: "",
      rooms: "",
      bathrooms: "",
      size: "",
      zipcode: "",
      state: "",
      city: "",
      neighborhood: "",
      street: "",
      number: "",
      complement: "",
      amenities_index: 0,
      amenities: {},
      furnitures_index: 0,
      furnitures: {},
      amenities_to_send: {},
      furnitures_to_send: {},
    }

    this.addAmenity = this.addAmenity.bind(this)
    this.removeAmenity = this.removeAmenity.bind(this)
    this.renderAmenities = this.renderAmenities.bind(this)
    this.addFurniture = this.addFurniture.bind(this)
    this.removeFurniture = this.removeFurniture.bind(this)
    this.renderFurnitures = this.renderFurnitures.bind(this)
    this.onBlurAmenity = this.onBlurAmenity.bind(this)
    this.onBlurFurniture = this.onBlurFurniture.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    this.addAmenity()
    this.addFurniture()
  }

  renderAmenities() {
    let amenities_array = Object.values(this.state.amenities)
    return amenities_array.map((amenity) =>
      amenity
    )
  }

  renderFurnitures() {
    let furnitures_array = Object.values(this.state.furnitures)
    return furnitures_array.map((furniture) =>
      furniture
    )
  }


  removeAmenity(index_comp) {
    let all_amenities = this.state.amenities
    delete this.state.amenities[index_comp]
    let first = null
    for(let key in all_amenities) {
      first = key;
      break
    }

    let ameni_buffer = Object.assign({}, this.state.amenities_to_send)
    delete ameni_buffer[index_comp]
    this.setState({amenities_to_send: ameni_buffer});

    document.getElementById("label-amenity"+first).innerHTML = "Facilidades"
    this.setState({amenities: all_amenities})
  }

  removeFurniture(index_comp) {
    let all_furnitures = this.state.furnitures
    delete this.state.furnitures[index_comp]
    let first = null
    for(let key in all_furnitures) {
      first = key;
      break
    }

   let furni_buffer = Object.assign({}, this.state.furnitures_to_send)
   delete furni_buffer[index_comp]
   this.setState({furnitures_to_send: furni_buffer})
    document.getElementById("label-furniture"+first).innerHTML = "Móveis"
    this.setState({furnitures: all_furnitures})
  }

  addAmenity() {
        let componentToAdd = <AmenityContainer
                               order={this.state.amenities_index}
                               key={this.state.amenities_index}
                               onBlur={this.onBlurAmenity}
                               onChangeAdd={this.addAmenity}
                               onChangeRemove={this.removeAmenity}/>;
       let ameni_buffer = Object.assign({}, this.state.amenities)
       ameni_buffer[this.state.amenities_index] = componentToAdd;

       this.setState({amenities: ameni_buffer});
       this.setState({amenities_index: this.state.amenities_index+1})
      console.log("tututu", this.state.amenities_to_send, this.state.furnitures_to_send)
  }

  addFurniture() {
      let componentToAdd = <FurnitureContainer
                             order={this.state.furnitures_index}
                             key={this.state.furnitures_index}
                             onChangeAdd={this.addFurniture}
                             onBlur={this.onBlurFurniture}
                             onChangeRemove={this.removeFurniture}/>;
     let furni_buffer = Object.assign({}, this.state.furnitures)
     furni_buffer[this.state.furnitures_index] = componentToAdd;
     this.setState({furnitures: furni_buffer});
     this.setState({furnitures_index: this.state.furnitures_index+1})
    console.log("tututu", this.state.amenities_to_send, this.state.furnitures_to_send)
  }

  onBlurAmenity(newelement, index) {
     let ameni_buffer = Object.assign({}, this.state.amenities_to_send)
     ameni_buffer[index] = {name: newelement}
     this.setState({amenities_to_send: ameni_buffer});
  }

  onBlurFurniture(newelement, index) {
     let furni_buffer = Object.assign({}, this.state.furnitures_to_send)
     furni_buffer[index] = {name: newelement}
     this.setState({furnitures_to_send: furni_buffer});
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  };

  handleSubmit(e) {
    e.preventDefault();

    const conf = {
      method: "post",
      body: this.prepareJson(),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      }
    };
    fetch(this.props.endpoint, conf).then(response => {
         if (response.status !== 201) {
          return null;
        }
        return response.json();
    }).then(data => {

    })

  }

  prepareJson() {
    let json = {
      people: this.state.people,
      rooms: this.state.rooms,
      bathrooms: this.state.bathrooms,
      size: this.state.size,
      address: {
        zipcode: this.state.zipcode,
        state: this.state.state,
        city: this.state.city,
        neighborhood: this.state.neighborhood,
        street: this.state.street,
        number: this.state.number,
        complement: this.state.complement
      },

      amenities: Object.values(this.state.amenities_to_send),
      furnitures: Object.values(this.state.furnitures_to_send),
      pictures: [],
      real_rooms: []
    }

    return JSON.stringify(json)
  }

  render() {
    return (
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
    )
  }
}