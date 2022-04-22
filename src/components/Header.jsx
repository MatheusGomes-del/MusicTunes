import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    constructor() {
        super()

        this.state = {
            userName: '',
            load: false,
        }
    }

    componentDidMount() {

        this.setState({
            load: true,
        }, async () => {
           const user = await getUser()
           this.setState({
               load: false,
               userName: user.name,
           })
        })
    }



    render() {
        const { userName, load } = this.state
        return (
            <div>
                {load ? (<Loading />) : (
                    <header data-testid="header-component">
                        <p data-testid="header-user-name">{ userName }</p>
                    </header>
                )}
            </div>
        )
    }
}


export default Header;