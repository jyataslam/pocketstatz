import React, { Component } from 'react';

class Sidenav extends Component {
    componentDidMount(){
        const config = {
            draggable: true,
            inDuration: 350,
            outDuration: 350,
            preventScrolling: true
        }

        M.Sidenav.init(this.sidenav, config);
    }

    render() {
        const { links } = this.props;

        return (
                <ul ref={(element) => {this.sidenav = element}} id="sidenav" className="sidenav sidenav-custom">
                    {links}
                </ul>
            
        )
    }
}

export default Sidenav;