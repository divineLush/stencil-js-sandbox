import { Component, State, Prop, Watch, Listen, h } from '@stencil/core'

@Component({
    tag: 'fancy-stock-price',
    styleUrl: './stock-price.css',
    shadow: true,
})
export class StockPrice {
    stockInput: HTMLInputElement
    // initialStockSymbol: string

    // reference to web component
    // @Element() el: HTMLElement

    @State() price: number = 0

    @State() isInputValid: boolean = false

    @State() isLoading: boolean = false

    @State() userInput: string

    @State() error: string


    @Prop({
        mutable: true,
        reflect: true
    }) stockSymbol: string

    // watching for stockSymbol prop changes
    @Watch('stockSymbol')
    stockSymbolChanged (newValue, oldValue) {
        if (newValue !== oldValue)
            this.fetchStockPrice(newValue)
    }

    @Listen('fancySymbolSelected', { target: 'body' })
    onStockSymbolSelected (event: CustomEvent) {
        if (event.detail && event.detail !== this.stockSymbol) {
            this.stockSymbol = event.detail
            this.userInput = event.detail
        }
    }

    fetchStockPrice (stockSymbol: string) {
        this.isLoading = true
        const key = 'P7SR0H6KNOLFERI9'
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ stockSymbol }&apikey=${ key }`
        fetch(url)
        .then(res => res.json())
        .then(res => {
            const price = res['Global Quote']['05. price']
            if (!price)
            throw new Error('Invalid Symbol')

            this.error = null
            this.price = +price
            this.isLoading = false
        })
        .catch(err => {
            this.error = err.message
            this.price = null
            this.isLoading = false
        })
    }

    onUserInput (event: Event) {
        this.userInput = (event.target as HTMLInputElement).value
        this.isInputValid = this.userInput.trim() !== ''
    }

    onSubmit (event: Event) {
        event.preventDefault();
        // const input = this.el.shadowRoot.querySelector('.stock-price__input')
        this.stockSymbol = this.stockInput.value
        // no need to call fetchStockPrice manually because of watcher
        // this.fetchStockPrice(stockSymbol)
    }

    componentDidLoad () {
        // at this point of time render function is already executed
        // mutating a stateful value in componentDidLoad is inefficient
        // as render function will have to run again
        console.log('componentDidLoad')
    }

    hostData () {
        // meta data about host element
        return { class: this.error ? '_error' : '' }
    }

    // stencil executes this method right before this component is about to load
    componentWillLoad () {
        // at this point of time stencil is already able to read attributes
        // render function is about to be executed
        console.log('componentWillLoad', this.stockSymbol)
        if (this.stockSymbol) {
            // garbage for watching stockPrice prop changes
            // this.initialStockSymbol = this.stockSymbol
            this.userInput = this.stockSymbol
            this.isInputValid = true
            this.fetchStockPrice(this.stockSymbol)
        }
    }

    componentWillUpdate () {
        // runs before rerendering
        console.log('componentWillUpdate')
    }

    componentDidUpdate () {
        // runs when @Prop or @State property updates
        console.log('componentWillUpdate')
        // garbage for watching stockPrice prop changes
        // if (this.stockSymbol !== this.initialStockSymbol) {
        //     this.initialStockSymbol = this.stockSymbol
        //     this.fetchStockPrice(this.stockSymbol)
        // }
    }

    // componentDidUnload () {
    //     console.log('componentDidUnload')
    // }

    renderContent () {
        const price = this.error ? this.error : `Price: ${ this.price }`

        return <p>{ price }</p>
    }

    render () {
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
            <section class="stock-price__data">
                <fancy-loading isVisible={ this.isLoading }></fancy-loading>
                { this.isLoading ? <div /> : this.renderContent() }
            </section>
        ]
    }
}
