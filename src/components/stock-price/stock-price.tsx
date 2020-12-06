import { Component, State, Element, h } from '@stencil/core'

@Component({
    tag: 'fancy-stock-price',
    styleUrl: './stock-price.css',
    shadow: true,
})
export class StockPrice {
    // reference to web component
    @Element() el: HTMLElement

    @State() price: number = 0

    onSubmit (event: Event) {
        event.preventDefault();
        const input = this.el.shadowRoot.querySelector('.stock-price__input')
        const stockSymbol = (input as HTMLInputElement).value
        const key = 'P7SR0H6KNOLFERI9'
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ stockSymbol }&apikey=${ key }`
        fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.price = +res['Global Quote']['05. price']
            })
    }

    render () {
        return [
            <form
                class="stock-price"
                onSubmit={ this.onSubmit.bind(this) }
            >
                <input class="stock-price__input" />
                <button
                    class="stock-price__btn"
                    type="submit"
                >
                    Fetch
                </button>
            </form>,
            <div class="stock-price__data">
                <p>Price: ${ this.price }</p>
            </div>
        ]
    }
}
