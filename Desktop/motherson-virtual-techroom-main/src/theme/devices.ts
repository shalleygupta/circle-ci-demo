export const size = {
  phone: "767px",
  tablet: "768px",
  desktop: "992px",
  largeDesktop: "1200px",
}

const device = {
  phone: `max-width: ${size.phone}`,
  tablet: `min-width: ${size.tablet}`,
  desktop: `min-width: ${size.desktop}`,
  largeDesktop: `min-width: ${size.largeDesktop}`,
}

export default device
