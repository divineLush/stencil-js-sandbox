import { Component, State, Prop, h } from '@stencil/core'

@Component({
    tag: 'fancy-stock-price',
    styleUrl: './stock-price.css',
    shadow: true,
})
export class StockPrice {
    stockInput: HTMLInputElement
    initialStockSymbol: string

    // reference to web component
    // @Element() el: HTMLElement

    @State() price: number = 0

    @State() isInputValid: boolean = false

    @State() userInput: string

    @State() error: string

    @Prop() stockSymbol: string

    fetchStockPrice (stockSymbol: string) {
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

    onUserInput (event: Event) {
        this.userInput = (event.target as HTMLInputElement).value
        this.isInputValid = this.userInput.trim() !== ''
    }

    onSubmit (event: Event) {
        event.preventDefault();
        // const input = this.el.shadowRoot.querySelector('.stock-price__input')
        const stockSymbol = this.stockInput.value
        this.fetchStockPrice(stockSymbol)
    }

    componentDidLoad () {
        // at this point of time render function is already executed
        // mutating a stateful value in componentDidLoad is inefficient
        // as render function will have to run again
        if (this.stockSymbol) {
            this.initialStockSymbol = this.stockSymbol
            this.userInput = this.stockSymbol
            this.isInputValid = true
            this.fetchStockPrice(this.stockSymbol)
        }
    }

    // stencil executes this method right before this component is about to load
    componentWillLoad () {
        // at this point of time stencil is already able to read attributes
        // render function is about to be executed
        console.log('componentWillLoad', this.stockSymbol)
    }

    componentWillUpdate () {
        // runs before rerendering
        console.log('componentWillUpdate')
    }

    componentDidUpdate () {
        // runs when @Prop or @State property updates
        console.log('componentWillUpdate')
        if (this.stockSymbol !== this.initialStockSymbol) {
            this.initialStockSymbol = this.stockSymbol
            this.fetchStockPrice(this.stockSymbol)
        }
    }

    // componentDidUnload () {
    //     console.log('componentDidUnload')
    // }

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
