import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'fancy-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true,
})
export class SideDrawer {
  @Prop() title: string;

  render() {
    return (
      <aside class="fancy-side-drawer">
        <header>
            <h1>{ this.title }</h1>
        </header>
        <main>
          <slot />
        </main>
      </aside>
    );
  }
}
