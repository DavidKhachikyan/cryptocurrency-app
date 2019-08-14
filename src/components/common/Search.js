import React from 'react';
import Loading from './Loading';
import { API_URL } from '../../Config';
import { handleResponse } from '../../Helpers';
import { withRouter } from 'react-router-dom';
import './Search.css';

class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            searchResults: [],
            searchQuery: '',
            loading: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this)
    }

    handleChange(e) {
        const searchQuery = e.target.value
        this.setState({
            searchQuery
        })
        if (!searchQuery) {
            return ''
        }
        this.setState({
            loading: true
        })
        fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
            .then(handleResponse)
            .then((result) => {
                this.setState({
                    searchResults: result,
                    loading: false

                })
            })
    }

    handleRedirect(currencyId) {
        this.setState({
            searchQuery: '',
            searchResults: []
        })
        this.props.history.push(`currency/${currencyId}`)
    }

    renderSearchResults() {
        const { searchResults, loading, searchQuery}=this.state
        if (!searchQuery) {
            return ''
        }
        if(searchResults.length > 0) {
            return (
                <div className="Search-result-container">
                    { 
                        searchResults.map(resulte => (
                            <div 
                            className="Search-result"
                            key={resulte.id}
                            onClick={() => this.handleRedirect(resulte.id)}
                            >
                                {resulte.name} ({resulte.symbol})
                            </div>
                        )

                        )
                    }
                </div>
            )
        }
        if(!loading) {
            return (
                <div className="Search-result-container">
                    <div className="Search-no-result">
                        No reaults
                    </div>
                </div>
            )
        }
    }
    render() {
        console.log(this.state)
        const { searchQuery, loading } = this.state
        return (
            <div className='Search'>
                <div>
                    <span className='Search-icon' />
                    <input
                        type='text'
                        className='Search-input'
                        placeholder='Currency Name'
                        onChange={this.handleChange}
                    // value={searchQuery}
                    />
                    {loading &&
                        <div className='Search-loading'>
                            <Loading 
                            width='14px'
                            height='14px'
                            
                            />
                        </div>
                    }
                </div>
                    {this.renderSearchResults()}
            </div>
        )
    }
}


export default withRouter(Search)