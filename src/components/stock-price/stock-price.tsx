import { Component, State, h } from '@stencil/core'

@Component({
    tag: 'fancy-stock-price',
    styleUrl: './stock-price.css',
    shadow: true,
})
export class StockPrice {
    stockInput: HTMLInputElement

    // reference to web component
    // @Element() el: HTMLElement

    @State() price: number = 0

    @State() isInputValid: boolean = false

    @State() userInput: string

    @State() error: string


    onUserInput (event: Event) {
        this.userInput = (event.target as HTMLInputElement).value
        this.isInputValid = this.userInput.trim() !== ''
    }

    onSubmit (event: Event) {
        event.preventDefault();
        // const input = this.el.shadowRoot.querySelector('.stock-price__input')
        const stockSymbol = this.stockInput.value
        const key = 'P7SR0H6KNOLFERI9'
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ stockSymbol }&apikey=${ key }`
        fetch(url)
            .then(res => res.json())
            .then(res => {
                const price = res['Global Quote']['05. price']
                console.log(res, price)
                if (!price)
                    throw new Error('Invalid Symbol')

                this.error = null
                this.price = +price
            })
            .catch(err => {
                this.error = err.message
            })
    }

    render () {
        const priceContent = this.error
            ? <p>{ this.error }</p>
            : <p>Price: ${ this.price }</p>

        return [
            <form
                class="stock-price"
                onSubmit={ this.onSubmit.bind(this) }
            >
                <input
                    class="stock-price__input"
                    ref={ el => this.stockInput = el }
                    value={ this.userInput }
                    onInput={ this.onUserInput.bind(this) }
                />
                <button
                    class="stock-price__btn"
                    type="submit"
                    disabled={ !this.isInputValid }
                >
                    Fetch
                </button>
            </form>,
            <div class="stock-price__data">
                { priceContent }
            </div>
        ]
    }
}
