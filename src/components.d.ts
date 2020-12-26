/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface FancySideDrawer {
        "open": boolean;
        "openSideDrawer": () => Promise<void>;
        "title": string;
    }
    interface FancyStockFinder {
    }
    interface FancyStockPrice {
        "stockSymbol": string;
    }
    interface FancyTooltip {
        "text": string;
    }
}
declare global {
    interface HTMLFancySideDrawerElement extends Components.FancySideDrawer, HTMLStencilElement {
    }
    var HTMLFancySideDrawerElement: {
        prototype: HTMLFancySideDrawerElement;
        new (): HTMLFancySideDrawerElement;
    };
    interface HTMLFancyStockFinderElement extends Components.FancyStockFinder, HTMLStencilElement {
    }
    var HTMLFancyStockFinderElement: {
        prototype: HTMLFancyStockFinderElement;
        new (): HTMLFancyStockFinderElement;
    };
    interface HTMLFancyStockPriceElement extends Components.FancyStockPrice, HTMLStencilElement {
    }
    var HTMLFancyStockPriceElement: {
        prototype: HTMLFancyStockPriceElement;
        new (): HTMLFancyStockPriceElement;
    };
    interface HTMLFancyTooltipElement extends Components.FancyTooltip, HTMLStencilElement {
    }
    var HTMLFancyTooltipElement: {
        prototype: HTMLFancyTooltipElement;
        new (): HTMLFancyTooltipElement;
    };
    interface HTMLElementTagNameMap {
        "fancy-side-drawer": HTMLFancySideDrawerElement;
        "fancy-stock-finder": HTMLFancyStockFinderElement;
        "fancy-stock-price": HTMLFancyStockPriceElement;
        "fancy-tooltip": HTMLFancyTooltipElement;
    }
}
declare namespace LocalJSX {
    interface FancySideDrawer {
        "open"?: boolean;
        "title"?: string;
    }
    interface FancyStockFinder {
    }
    interface FancyStockPrice {
        "stockSymbol"?: string;
    }
    interface FancyTooltip {
        "text"?: string;
    }
    interface IntrinsicElements {
        "fancy-side-drawer": FancySideDrawer;
        "fancy-stock-finder": FancyStockFinder;
        "fancy-stock-price": FancyStockPrice;
        "fancy-tooltip": FancyTooltip;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "fancy-side-drawer": LocalJSX.FancySideDrawer & JSXBase.HTMLAttributes<HTMLFancySideDrawerElement>;
            "fancy-stock-finder": LocalJSX.FancyStockFinder & JSXBase.HTMLAttributes<HTMLFancyStockFinderElement>;
            "fancy-stock-price": LocalJSX.FancyStockPrice & JSXBase.HTMLAttributes<HTMLFancyStockPriceElement>;
            "fancy-tooltip": LocalJSX.FancyTooltip & JSXBase.HTMLAttributes<HTMLFancyTooltipElement>;
        }
    }
}
