import { Component, Prop, h } from '@stencil/core'

@Component({
    tag: 'fancy-loading',
    styleUrl: './loading.css',
    shadow: true,
})
export class Loading {
    @Prop({ reflect: true }) isVisible: boolean

    render () {
        return this.isVisible
            ? <span class="fancy-loading">Loading...</span>
            : <div />
    }
}
