import React, { useCallback, useContext, useMemo, useState } from "react"
import * as S from "./styled"
import { Checkbox } from "../../../../components/Checkbox"
//@ts-ignore
import ProudToBe from "../../../../icons/ic-proud-to-be.svg"
import { useInterests } from "../../../../context/InterestsContext"
import { EventContext } from "../../../../context/EventContext"

export const ReviewForm: React.FC = props => {
  const interests = useInterests()
  const event = useContext(EventContext).data
  const [update, _setUpdate] = useState<boolean>(false)
  const onDropdownChange = useCallback((values: string[]) => {
    interests.setProducts(
      values
        .map(v => v.split("//"))
        .reduce(
          (acc: { [booth: string]: string[] }, [boothSlug, productSlug]) => ({
            ...acc,
            [boothSlug]: [...(acc[boothSlug] || []), productSlug],
          }),
          {}
        )
    )
    _setUpdate(u => !u)
  }, [])
  const memoizedInterests = useMemo(() => interests.products, [update])

  const dropdownValue = useMemo(
    () =>
      Object.keys(interests.products)
        .map(k => interests.products[k].map(p => `${k}//${p}`))
        .reduce((acc, curr) => [...acc, ...curr], []),
    [interests.products]
  )

  return (
    <S.ReviewContainer>
      <S.Title>Your requested products</S.Title>
      <S.RequestsContainer>
        {Object.keys(memoizedInterests)
          .map(k => event?.booths.find(b => b.slug === k)!)
          .sort((b1, b2) => b1.order - b2.order)
          .map(
            booth =>
              booth && (
                <React.Fragment key={booth.slug}>
                  {memoizedInterests[booth.slug]
                    ?.map(ps => booth.products.find(p => p.slug === ps)!)
                    .map(product => (
                      <React.Fragment key={product.slug}>
                        {interests.submissionState !== "submitted" && (
                          <Checkbox
                            checked={interests.products[booth.slug]?.includes(
                              product.slug
                            )}
                            onChange={() => interests.toggleProduct(product)}
                            id={product.slug + booth.slug}
                          />
                        )}
                        <label htmlFor={product.slug + booth.slug}>
                          <div>
                            <h5>
                              {String(booth.order).padStart(2, "0")}.{" "}
                              {booth.name}
                            </h5>
                            <h6>{product.details.name}</h6>
                          </div>
                        </label>
                      </React.Fragment>
                    ))}
                </React.Fragment>
              )
          )}
      </S.RequestsContainer>
      {interests.submissionState !== "submitted" && (
        <>
          <S.Title>Add more products to your request</S.Title>
          {/*@ts-ignore*/}
          <S.Dropdown
            label="Find products"
            value={dropdownValue}
            onChange={onDropdownChange}
          >
            {event?.booths.map(b => (
              <optgroup label={b.name} key={b.slug}>
                {b.products.map(p => (
                  <option
                    key={`${b.slug}${p.slug}`}
                    value={`${b.slug}//${p.slug}`}
                  >
                    {p.details.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </S.Dropdown>
        </>
      )}
      <S.Footer>
        <img src={ProudToBe} />
      </S.Footer>
    </S.ReviewContainer>
  )
}
