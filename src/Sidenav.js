import React from 'react';


class Sidenav extends React.Component {


    render() {
      const locations = this.props.locations;
      return (
          <aside id="whole">
                <div>
                  <div className="input-group">
                      <div id="enter-list" tabIndex="1" role="search box"> <label htmlFor="filter">Enter To Filter</label></div>
                      <input id="filter" tabIndex="2"
                               onChange={(e) => this.props.filter(e.target.value)}
                               type="text"
                        />
                    </div>
                </div>
                <nav id="places-list">
                    <ul>
                        {
                            locations.map((location, index) => {
                              return (
                                  <li key={location.title + index} tabIndex="3" role="location item">
                                      <button className="list-button" onClick={() => this.props.changeActiveMarker(location)}>{location.title}</button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
                <h3 className="listh">Spa</h3>
                <h3 className="listh">Resort</h3>
                <h3 className="listh">Airport</h3>
                <h3 className="listh">Gym</h3>
                <h3 className="listh">Stadium in Cairo</h3>

            </aside>
        )
    }
}

export default Sidenav;