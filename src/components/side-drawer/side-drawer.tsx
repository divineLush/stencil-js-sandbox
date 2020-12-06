import { Component, Prop, State, Method, h } from '@stencil/core';

enum Tabs {
    'Navigation',
    'Contact',
}

@Component({
  tag: 'fancy-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true,
})
export class SideDrawer {
  // by default prop changes are not reflected to the attribute
  @Prop({ reflect: true }) title: string

  // by default props are immutable
  @Prop({ reflect: true, mutable: true }) open: boolean

  @State() currentTab: Tabs = Tabs.Navigation

  onClose () {
      this.open = false
  }

  onContentChange (tab: Tabs) {
      console.log(tab)
      this.currentTab = tab
  }

  @Method()
  openSideDrawer () {
      this.open = true
  }

  render() {
    const isNav = this.currentTab === Tabs.Navigation
    const mainContent = isNav ? <slot /> : (
        <article>
          <h2>Contact Information</h2>
        </article>
      )
    const navBtnClasses = [
        'fancy-side-drawer__tab-btn',
        isNav ? 'fancy-side-drawer__tab-btn--active' : ''
    ].join(' ')
    const contactBtnClasses = [
        'fancy-side-drawer__tab-btn',
        !isNav ? 'fancy-side-drawer__tab-btn--active' : ''
    ].join(' ')

    return (
      <aside class="fancy-side-drawer">
        <header class="fancy-side-drawer__header">
          <h1 class="fancy-side-drawer__header-title">{ this.title }</h1>
          <button
            class="fancy-side-drawer__close-btn"
            onClick={ this.onClose.bind(this) }
          >
            Close
          </button>
        </header>
        <main>
          <section class="fancy-side-drawer__tabs">
            <button
              class={ navBtnClasses }
              onClick={ this.onContentChange.bind(this, Tabs.Navigation) }
            >
              Navigation
            </button>
            <button
              class={ contactBtnClasses }
              onClick={ this.onContentChange.bind(this, Tabs.Contact) }
            >
              Contact
            </button>
          </section>
          <section class="fancy-side-drawer__content">
              { mainContent }
          </section>
        </main>
      </aside>
    )
  }
}
