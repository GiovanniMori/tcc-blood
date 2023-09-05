"use client"

import React, { FunctionComponent } from "react"
import { TailSpin } from "react-loader-spinner"

function Loader() {
  return (
    <TailSpin
      height={16}
      width={16}
      color={"#FFFFFF"}
      ariaLabel="tail-spin-loading"
    />
  )
}

export default Loader
