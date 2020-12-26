
import { Component, State, Event, EventEmitter, h } from '@stencil/core'

type SearchResult = { symbol: string, name: string }

@Component({
    tag: 'fancy-stock-finder',
    styleUrl: './stock-finder.css',
    shadow: true,
})
export class StockFinder {
    stockNameInput: HTMLInputElement

    @State() searchResults: SearchResult[] = []

    @State() error: string

    @Event({
        bubbles: true,
        composed: true,
    }) fancySymbolSelected: EventEmitter<string>

    onSubmitStocks (event: Event) {
        event.preventDefault()
        const key = 'P7SR0H6KNOLFERI9'
        const stockName = this.stockNameInput.value
        const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${key}`
        fetch(url)
            .then(res => res.json())
            .then(res => {
                const matches = res.bestMatches
                if (!matches.length)
                    throw new Error('Invalid Symbol')

                this.error = null

                this.searchResults = matches
                    .map(match => ({ symbol: match['1. symbol'], name: match['2. name'] }))
            })
            .catch(err => {
                this.error = err.message
            })
    }

    resultItem (result) {
        const resultText = `${result.symbol}: ${result.name}`

        return <button
            class="stock-finder__result-btn"
            onClick={ this.onSelectSymbol.bind(this, result.symbol) }
        >
            { resultText }
        </button>
    }

    resultsList () {
        const results = this.searchResults
            .map(result => this.resultItem(result))

        return <article class="stock-finder__results-list">{ results }</article>
    }

    onSelectSymbol (symbol: string) {
        this.fancySymbolSelected.emit(symbol)
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
            <section class="stock-finder__content">
                { this.error ? <p class="stock-finder__error-message">{ this.error }</p> : this.resultsList() }
            </section>
        ]
    }
}
