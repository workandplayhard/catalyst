import type {CustomElement} from './custom-element.js'
import {dasherize} from './dasherize.js'

/**
 * Register the controller as a custom element.
 *
 * The classname is converted to a approriate tag name.
 *
 * Example: HelloController => hello-controller
 */
export function register(classObject: CustomElement): void {
  const name = dasherize(classObject.name).replace(/-element$/, '')

  try {
    window.customElements.define(name, classObject)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window[classObject.name] = customElements.get(name)
  } catch (e: unknown) {
    // The only reason for window.customElements.define to throw a `NotSupportedError`
    // is if the element has already been defined.
    if (e instanceof DOMException && e.name === 'NotSupportedError') return

    throw e
  }
}
