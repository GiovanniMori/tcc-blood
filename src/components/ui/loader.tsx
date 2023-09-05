"use client"

import React, { FunctionComponent } from "react"
import { TailSpin } from "react-loader-spinner"
import { BaseProps } from "react-loader-spinner/dist/type"

type LoaderProps = BaseProps

function Loader(props: LoaderProps) {
  return (
    <TailSpin
      {...props}
      height={props.height ? props.height : 16}
      width={props.width ? props.width : 16}
      color={props.color ? props.color : "#FFFFFF"}
      ariaLabel="tail-spin-loading"
    />
  )
}

export default Loader
