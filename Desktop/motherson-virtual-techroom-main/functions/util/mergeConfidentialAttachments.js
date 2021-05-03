module.exports.mergeConfidentialAttachments = event => {
  if (
    !event.confidentialAttachments ||
    event.confidentialAttachments.length === 0
  )
    return event

  // For each attachment, find respective product in booths and add that product
  return {
    ...event,
    booths: event.booths.map(b => ({
      ...b,
      products: b.products.map(p => ({
        ...p,
        attachments: [
          ...p.attachments.map(p => ({ ...p, visibility: "default" })),
          ...event.confidentialAttachments
            .filter(a => a.product.id === p.id)
            .map(p => ({ ...p, visibility: "confidential" })),
        ],
      })),
    })),
  }
}
