import React, { createContext, useCallback, useContext, useState } from "react"
import { Product } from "../types/Product"
import { fetch } from "cross-fetch"
import { createGlobalStyle } from "styled-components"
import { toast } from "react-toastify"
import checkIconUrl from "../icons/ic-check.svg"

type ProductsList = { [boothSlug: string]: string[] }

type SubmissionState = "submitting" | "submitted" | "failed" | undefined

type SubmissionInput = {
  name: string
  lastName: string
  company?: string
  email: string
  acceptsDataTerms: boolean
  event: {
    slug: string
    code?: string
  }
}

type ContextType = {
  toggleProduct: (product: Product, productNameForToast?: string) => any
  products: ProductsList
  setProducts: (products: ProductsList) => any
  reset: () => any
  submissionState: SubmissionState
  submit: (value: SubmissionInput) => any
}

const InterestsContext = createContext<ContextType>({
  products: {},
  setProducts: () => null,
  toggleProduct: () => null,
  reset: () => {},
  submissionState: undefined,
  submit: () => null,
})

export const useInterests = () => {
  return useContext(InterestsContext)
}

const Toast: React.FC<{ productName: string }> = ({ productName }) => (
  <>
    <img src={checkIconUrl} style={{ marginRight: 8 }} />
    {productName} was added to your requests
  </>
)
const showToast = (productName: string | undefined) =>
  productName && toast(<Toast productName={productName} />)

const WhileSubmittingGlobalStyles = createGlobalStyle`
html, body {pointer-events: none; cursor: wait}`

export const WithProductInterestsContext: React.FC = props => {
  const [products, setProductsList] = useState<ProductsList>({})

  const toggleProduct = useCallback(
    (p: Product, productNameForToast: string | undefined = undefined) =>
      setProductsList(list => {
        // If there's not any product in the list, just add it
        if (!list[p.parentBoothSlug]) {
          showToast(productNameForToast)
          return {
            ...list,
            [p.parentBoothSlug]: [p.slug],
          }
          // Product's in there - remove
        } else if (list[p.parentBoothSlug].includes(p.slug)) {
          return {
            ...list,
            [p.parentBoothSlug]: list[p.parentBoothSlug].filter(
              s => s !== p.slug
            ),
          }
          // Add it
        } else {
          showToast(productNameForToast)
          return {
            ...list,
            [p.parentBoothSlug]: [...list[p.parentBoothSlug], p.slug],
          }
        }
      }),
    [setProductsList]
  )

  const [submissionState, _setSubmissionState] = useState<SubmissionState>()

  const submit = useCallback(
    (value: SubmissionInput) => {
      _setSubmissionState("submitting")
      return fetch("/.netlify/functions/checkout", {
        method: "POST",
        body: JSON.stringify({
          ...value,
          products,
        }),
      })
        .then(res => {
          if (res.status === 200) return res.json()
          throw res.status
        })
        .then(() => _setSubmissionState("submitted"))
        .catch(code => {
          console.log(code)
          _setSubmissionState("failed")
        })
    },
    [products]
  )

  const reset = useCallback(() => {
    setProductsList({})
    _setSubmissionState(undefined)
  }, [setProductsList])
  return (
    <InterestsContext.Provider
      value={{
        toggleProduct,
        products,
        reset,
        setProducts: setProductsList,
        submit,
        submissionState,
      }}
    >
      {submissionState === "submitting" && <WhileSubmittingGlobalStyles />}
      {props.children}
    </InterestsContext.Provider>
  )
}
