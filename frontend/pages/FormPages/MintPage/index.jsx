import React, { useState, useEffect } from "react"

import Container from "@mui/material/Container"

import DauHeader from "components/Molecules/layouts/Header"
import DauProgress from "components/Molecules/layouts/ProgressBar"
import MintProduct from "components/Molecules/layouts/Form/MintProduct"
import BaseLayout from "layouts/sections/components/BaseLayout"
import {
  ProcessingStep,
  SuccessStep,
  ErrorStep,
} from "components/Molecules/layouts/Form/PublicStep"

import defaultRoutes from "routes/routesProcessing"

// Import Web3-Storage
import { useCanister, useConnect } from "@connect2ic/react"
import { Principal } from "@dfinity/principal"

// Import const
import { uploadToWeb3Storage, replaceString, STRING_TOKEN } from "const"

function MintPage() {
  const [dip721, { loadingDip721, errorDip721 }] = useCanister("dip721", {
    mode: "anonymous",
  })
  const { principal } = useConnect()

  const totalSteps = defaultRoutes.createSeller.length
  const [progress, setProgress] = useState(defaultRoutes.createSeller)
  const [values, setValues] = useState({
    s1: {
      file: undefined,
      name: "",
      description: "",
    },
  })
  const [dataMint, setDataMint] = useState()
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleNextStep = () => {
    const nextProgress = defaultRoutes.functions.nextStep(progress)
    setProgress([...nextProgress])
  }

  const handleErrorStep = () => {
    const nextProgress = defaultRoutes.functions.nextErrorStep(progress)
    setProgress([...nextProgress])
  }

  const handleMint = async (file, name, description) => {
    try {
      const cid = await uploadToWeb3Storage([file])
      const data = {
        name: name,
        description: description,
        url: replaceString(STRING_TOKEN, {
          cid: cid,
          name: file.name,
        }),
      }
      if (principal) {
        return await dip721.mint(Principal.fromText(principal), data)
      }
    } catch (error) {
      console.log(error)
      setValues((currentValues) => {
        return {
          ...currentValues,
          s3: {},
        }
      })
      handleErrorStep()
      setIsError(true)
      setErrorMessage("Server Error")
    }
  }

  const onReInput = () => {
    setValues({
      s1: {
        file: undefined,
        name: "",
        description: "",
      },
    })
    setProgress(defaultRoutes.createSeller)
  }

  useEffect(() => {
    if (dataMint) {
      setValues((currentValues) => {
        return {
          ...currentValues,
          s3: {},
        }
      })
      if (dataMint.Ok) {
        handleNextStep()
        setIsSuccess(true)
      } else {
        handleErrorStep()
        setIsError(true)
        setErrorMessage(Object.keys(dataCreate.Err)[0])
      }
    }
  }, [dataMint])

  return (
    <BaseLayout
      breadcrumb={[
        { label: "Home", route: "/presentation" },
        { label: "My Collections", route: "/collection" },
        { label: "Mint Product" },
      ]}
      title=""
    >
      <DauProgress progress={progress} />
      <MintProduct
        onNextStep={handleNextStep}
        values={values}
        setValues={setValues}
        action={handleMint}
        setDataAction={setDataMint}
      />
      <ProcessingStep values={values} totalSteps={totalSteps} />
      <ErrorStep
        values={values}
        totalSteps={totalSteps}
        error={isError}
        errorMessage={errorMessage}
        routeOk={"/collection"}
        onClickReinput={onReInput}
      />
      <SuccessStep
        values={values}
        totalSteps={totalSteps}
        success={isSuccess}
        routeOk={"/collection"}
      />
    </BaseLayout>
  )
}

export default MintPage
