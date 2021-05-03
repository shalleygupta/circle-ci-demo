/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

export const onClientEntry = async () => {
  console.log("On client entry")
  if (typeof IntersectionObserver === `undefined`) {
    console.log("adding intersection-observer polyfill")
    await import(`intersection-observer`)
  }

  if (!("scrollBehavior" in document.documentElement.style)) {
    console.log("adding smooth-scroll polyfill")
    await import("smoothscroll-polyfill").then(p => p.polyfill())
  }
}
