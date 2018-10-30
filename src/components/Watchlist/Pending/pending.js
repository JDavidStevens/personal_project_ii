import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import {updatePending} from '../../../ducks/reducer';
import './pending.css';


class Pending extends Component {
    constructor(){
        super()

        this.handleCancel=this.handleCancel.bind(this);
    }

    handleCancel(id){
        axios.delete(`/api/cancel/${id}`).then(res=>{
            this.props.updatePending(res.data)
        })
    }
    
    render() {
console.log("pendpage",this.props.pending)



        const pendingBuyList = this.props.pending.map((element, index) => {
            if (element.trade_type === "Buy ") {
                return (
                    <Tbody key={index} className="pending-tbody">
                        <Tr className="pending-tr">
                            <Td className="pending-td">{element.stock_name}</Td>
                            <Td className="pending-td">{element.symbol}</Td>
                            <Td className="pending-td">{element.order_type}</Td>
                            <Td className="pending-td">{element.shares}</Td>
                            <Td className="pending-td">{element.trigger_price}</Td>
                            <Td className="pending-td">{this.props.quotes[element.symbol].quote.latestPrice}</Td>
                            <Td className="pending-td"><button className="pending-cancel-button" onClick={()=>this.handleCancel(element.id)}>Cancel</button></Td>
                        </Tr>
                    </Tbody>
                )
            }else{return null}
        })
        console.log("pendpagemaps",pendingBuyList)
        const pendingSaleList = this.props.pending.map((element, index) => {
            if (element.trade_type === "Sell ") {
                return (
                    <Tbody key={index} className="pending-tbody">
                        <Tr className="pending-tr">
                            <Td className="pending-td">{element.stock_name}</Td>
                            <Td className="pending-td">{element.symbol}</Td>
                            <Td className="pending-td">{element.order_type}</Td>
                            <Td className="pending-td">{element.shares}</Td>
                            <Td className="pending-td">{element.trigger_price}</Td>
                            <Td className="pending-td">{this.props.quotes[element.symbol].quote.latestPrice}</Td>
                            <Td className="pending-td"><button className="pending-cancel-button" onClick={()=>this.handleCancel(element.id)}>Cancel</button></Td>
                        </Tr>
                    </Tbody>
                )
            }else{return null}            
        })
        
        return (
            <div className="Watchlist">
                <div>
                <h3 className="pending-purchase-title">Pending Purchases</h3>
                {pendingBuyList!==null?
                <Table className="pending-table">
                    <Thead className="pending-thead">
                        <Tr className="pending-tr">
                            <Th className="pending-th">Name</Th>
                            <Th className="pending-th">Symbol</Th>
                            <Th className="pending-th">Order Type</Th>
                            <Th className="pending-th">Share Quantity</Th>
                            <Th className="pending-th">Trigger Price</Th>
                            <Th className="pending-th">Current Price</Th>
                            <Th className="pending-th">Cancel Order</Th>
                        </Tr>
                    </Thead>
                    {pendingBuyList}
                </Table>:<p>No pending purchases at this time</p>}
                </div>
                <div>
                <h3 className="pending-sales-title">Pending Sales</h3>
                {pendingSaleList!==null?
                <Table className="pending-table">
                    <Thead>
                        <Tr className="pending-tr">
                            <Th className="pending-th">Name</Th>
                            <Th className="pending-th">Symbol</Th>
                            <Th className="pending-th">Order Type</Th>
                            <Th className="pending-th">Share Quantity</Th>
                            <Th className="pending-th">Trigger Price</Th>
                            <Th className="pending-th">Current Price</Th>
                            <Th className="pending-th">Cancel Order</Th>
                        </Tr>
                    </Thead>
                    {pendingSaleList}
                </Table>:<p>No pending sales at this time</p>}
                </div>
                <div>
                <footer className="watchlist-footer">
        Data provided for free by <a href="https://iextrading.com/developer">IEX</a>. View <a href="https://iextrading.com/api-exhibit-a/">IEX’s Terms of Use</a>.
        </footer>
                </div>
            </div>

        )
    }
}

function mapStateToProps(state) {
    const { pending,quotes } = state;
    return {
        pending,quotes
    }
}

export default connect(mapStateToProps,{updatePending})(Pending)