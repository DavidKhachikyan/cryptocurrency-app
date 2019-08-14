import React from 'react';
import Loading from './Loading';
import { API_URL } from '../../Config';
import { handleResponse } from '../../Helpers';
import './Search.css';

class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            searchResults: [],
            searchQuery: '',
            loading: false
        }
        this.handleChange = this.handleChange.bind(this)
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
            </div>
        )
    }
}


export default Search