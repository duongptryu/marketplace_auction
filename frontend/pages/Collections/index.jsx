import React, { useEffect, useState } from "react"

import DauHeader from "components/Molecules/layouts/Header"
import Collection from "components/Molecules/layouts/Collection"

import { useCanister, useConnect } from "@connect2ic/react"
import { Principal } from "@dfinity/principal"

function Collections() {
  const [data, setData] = useState([])
  const { principal } = useConnect()
  const [dip721, { loadingDip721, errorDip721 }] = useCanister("dip721", {
    mode: "anonymous",
  })

  useEffect(async () => {
    try {
      console.log(principal, ">>>")
      if (principal) {
        const res = await dip721.getMyNfts(Principal.fromText(principal))
        setData(res)
        console.log(res)
      }
    } catch (err) {
      console.log(err)
    }
  }, [principal])

  return (
    <>
      <DauHeader
        changeColorOnScroll={{
          height: 1,
          color: "transparent",
          shadow: "none",
        }}
      />
      <Collection items={data} />
    </>
  )
}

export default Collections
