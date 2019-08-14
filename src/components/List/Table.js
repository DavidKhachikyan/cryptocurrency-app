import React from 'react';
import './Table.css';
import { renderChangePercent } from '../../Helpers';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

const Table = (props) => {
    
    const { currencies, history } = props
    return (
        <div className='Table-container'>
            <table className="Table">
                <thead className="Table-head">
                    <tr>
                        <th>Cryptocurreny</th>
                        <th>Price</th>
                        <th>Market Cap</th>
                        <th>24H Change</th>
                    </tr>

                </thead>
                <tbody className="Table-body">
                    {
                        currencies.map(item => {
                            return (
                                <tr key={item.id}
                                    onClick={()=> history.push(`/currency/${item.id}`)} //bom
                                >
                                    <td>
                                        <span className="Table-rank">
                                            {item.rank}
                                        </span>
                                        <span>
                                            {item.name}
                                        </span>
                                    </td>
                                    <td>
                                        $ <span className="Table-dollar">{item.price}</span>
                                    </td>
                                    <td>
                                        $ <span className="Table-dollar">{item.marketCap}</span>
                                    </td>
                                    <td>
                                        {renderChangePercent(item.percentChange24h)}
                                    </td>
                                </tr>
                            )

                        })
                    }

                </tbody>

            </table>
           
        </div>
    )
}

Table.propTypes = {
    currencies: PropTypes.array
}
export default withRouter (Table)