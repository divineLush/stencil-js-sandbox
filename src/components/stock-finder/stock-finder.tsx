
import { Component, State, h } from '@stencil/core'

type SearchResult = { symbol: string, name: string }

@Component({
    tag: 'fancy-stock-finder',
    styleUrl: './stock-finder.css',
    shadow: true,
})
export class StockFinder {
    stockNameInput: HTMLInputElement

    @State() searchResults: SearchResult[] = []

    onSubmitStocks (event: Event) {
        event.preventDefault()
        const key = 'P7SR0H6KNOLFERI9'
        const stockName = this.stockNameInput.value
        const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${key}`
        fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log(res, res.bestMatches)
                this.searchResults = res.bestMatches
                    .map(match => ({ symbol: match['1. symbol'], name: match['2. name'] }))
            })
            .catch(err => console.log(err))
    }

    render () {
        return [
            <form
                class="stock-finder"
                onSubmit={ this.onSubmitStocks.bind(this) }
            >
                <input
                    class="stock-finder__input"
                    ref={ el => this.stockNameInput = el }
                />
                <button
                    class="stock-finder__btn"
                    type="submit"
                >
                    Find
                </button>
            </form>,
            <ul class="stock-finder__results-list">
                { this.searchResults.map(result => <li class="stock-finder__result">{ result.name }</li>) }
            </ul>
        ]
    }
}
