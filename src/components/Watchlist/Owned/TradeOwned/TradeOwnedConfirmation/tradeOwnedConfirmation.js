import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

class OwnedConfirmation extends Component{

    render(){

console.log("oi",this.props)

        let finalOwnedTotal = parseInt(this.props.tradeQty)*parseInt(this.props.orderInfo[1])
    return(
        <div>
            {this.props.buySell==="Sell All Shares "? <p>Your order to sell all shares of {this.props.orderInfo[0]} has been submitted. Your total is ${finalOwnedTotal}.</p>:
           <p> Your order to {this.props.buySell} {this.props.tradeQty} shares of {this.props.orderInfo[0]} has been submitted. Your total is ${finalOwnedTotal}.</p>}
           <div>
               {this.props.buySell==="Buy "?<button>Payment</button>:
               <Link to='/list'>Return to My Homepage</Link>}
           </div>
        </div>
    )
    }
}



function mapStateToProps(state) {
    const {orderInfo,buySell,tradeQty } = state;
    return {
        orderInfo,
        buySell,
        tradeQty
    }
}

export default connect(
    mapStateToProps
)(OwnedConfirmation);