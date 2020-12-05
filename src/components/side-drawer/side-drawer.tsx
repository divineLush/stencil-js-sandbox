import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'fancy-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true,
})
export class SideDrawer {
  // by default prop chenges are not reflected to the attribute
  @Prop({ reflect: true }) title: string;

  render() {
    return (
      <aside class="fancy-side-drawer">
        <header class="fancy-side-drawer__header">
            <h1 class="fancy-side-drawer__header-title">
                { this.title }
            </h1>
        </header>
        <main>
          <slot />
        </main>
      </aside>
    )
  }
}
