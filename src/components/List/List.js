import React from 'react';
import { API_URL } from '../../Config';
import { handleResponse } from '../../Helpers';
import Loading from '../common/Loading';
import Table from './Table';
import Pagination from './Pagination';




class List extends React.Component {
    constructor() {
        super()
        this.state = {
            currencies: [],
            loading: false,
            totalPages: 0,
            page: 1,
            error: null,

        }

    }
    // componentWillMount(){
    //     console.log('componentWillMount')
    // } shat qich e ogtagortsvum

    
    componentDidMount() {
        this.fetchCurrencies()
    }
       

    fetchCurrencies = () => {
        this.setState({
            loading: true
        })
        const {page} = this.state;
        fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
            .then(handleResponse)

            .then(data => {
                this.setState({
                    currencies: data.currencies,
                    loading: false,
                    totalPages: data.totalPages
                })
                
            })
            .catch(error => {

                this.setState({
                    error: error,
                    loading: false
                })

            })
    }
    
    handlePaginationClick = direction => {
            let nextPage = this.state.page
            nextPage = direction === 'next' ? nextPage +1: nextPage -1
            this.setState ({
                page: nextPage
            }, () => {this.fetchCurrencies()})
            
    }

    render() {
        
        const { currencies, loading, error, totalPages, page } = this.state;
        if (loading) {
            return (
                <div className='loading-container'>
                    <Loading />
                </div>
            )
        }
        if (error) {
            return (
                <div className='error'>
                    Not found
                </div>
            )
        }
        return (
            <div>
                <Table
                    currencies={currencies}
                />
                <Pagination 
                page = {page}
                totalPages = {totalPages}
                handlePaginationClick = {this.handlePaginationClick}
                />
            </div>
        )
    }
}

export default List