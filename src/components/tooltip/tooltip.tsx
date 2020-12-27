import { Component, Prop, State, h } from '@stencil/core';

@Component({
    tag: 'fancy-tooltip',
    styleUrl: './tooltip.css',
    shadow: true,
})
export class Tooltip {
    @Prop() text: string

    @State() isVisible: boolean = false

    tooltipContent () {
        return this.isVisible
            ? <p class="fancy-tooltip__text">{ this.text }</p> : null
    }

    toggleVisibility () {
        this.isVisible = !this.isVisible
    }

    render () {
        return (
            <article class="fancy-tooltip">
                <button
                    class="fancy-tooltip__btn"
                    onClick={ this.toggleVisibility.bind(this) }
                >
                    toggle tooltip
                </button>
                { this.tooltipContent() }
            </article>
        )
    }
}
