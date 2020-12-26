
import { Component, h } from '@stencil/core'

@Component({
    tag: 'fancy-stock-finder',
    styleUrl: './stock-finder.css',
    shadow: true,
})
export class StockFinder {
    stockNameInput: HTMLInputElement

    onSubmitStocks (event: Event) {
        event.preventDefault()
        const key = 'P7SR0H6KNOLFERI9'
        const stockName = this.stockNameInput.value
        const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${key}`
        fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log(res)
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
        ]
    }
}
