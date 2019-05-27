import React,{ Component } from "react";



export default class ShopCarContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
          payLoading: false
        }
    }
        
    lookMovie = () => {
        this.props.history.push('/movie')
    }

    render() {
        return (
            <div className='home'>
                <p>Hello,World</p>
                <div onClick={this.lookMovie} style={{marginTop:'20px',cursor:'pointer'}}><a>我要去看电影</a></div>
            </div>
        )
    }
          
        
}