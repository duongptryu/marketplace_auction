import React, { useEffect, useState } from "react"

// Import component MUI
import Container from "@mui/material/Container"

import DauHeader from "components/Molecules/layouts/Header"
import DauProgress from "components/Molecules/layouts/ProgressBar"
import {
  FormStepOne,
  FormStepTwo,
} from "components/Molecules/layouts/Form/CreateNftProduct"
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

const convertDaysToMiliSeconds = (days) => {
  return BigInt(parseFloat(days) * 86400000)
}

function CreateNftProduct() {
  const [
    marketplace_auction,
    { loadingMarket, errorMarket, canisterDefinition },
  ] = useCanister("marketplace_auction", {
    mode: "anonymous",
  })
  const [dip721, { loadingDip721, errorDip721 }] = useCanister("dip721", {
    mode: "anonymous",
  })
  const { principal } = useConnect()
  const stateMarket = canisterDefinition.canisterId;
  
  const totalSteps = defaultRoutes.createRealProduct.length
  const [progress, setProgress] = useState(defaultRoutes.createRealProduct)
  const [values, setValues] = useState({
    s1: {
      title: "",
      description: "",
      duration: 1,
      startPrice: "",
      stepBid: "",
      currency: "none",
    },
  })
  const [dataCreate, setDataCreate] = useState()
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleNextStep = () => {
    const nextProgress = defaultRoutes.functions.nextStep(progress)
    setProgress([...nextProgress])
  }

  const handlePreviousStep = () => {
    const previousProgress = defaultRoutes.functions.previousStep(progress)
    setProgress([...previousProgress])
  }

  const handleErrorStep = () => {
    const nextProgress = defaultRoutes.functions.nextErrorStep(progress)
    setProgress([...nextProgress])
  }

  const handleCreateNftProduct = async (values) => {
    try {
      console.log(values)
      if (principal) {
        dip721.approve(
          Principal.fromText(principal),
          Principal.fromText(stateMarket),
          BigInt(values.tokenId),
        )
        return await marketplace_auction.AddOrder(
          Principal.fromText(principal),
          "NFT",
          values.title,
          BigInt(values.tokenId),
          values.description,
          BigInt(values.stepBid),
          BigInt(values.startPrice),
          values.currency,
          convertDaysToMiliSeconds(values.duration),
          "",
          "",
        )
      }
    } catch (error) {
      console.log(error)
      setValues((currentValues) => {
        return {
          ...currentValues,
          s4: {},
        }
      })
      handleErrorStep()
      setIsError(true)
    }
  }

  useEffect(() => {
    if (dataCreate) {
      setValues((currentValues) => {
        return {
          ...currentValues,
          s4: {},
        }
      })
      if (dataCreate.Ok) {
        handleNextStep()
        setIsSuccess(true)
      } else {
        handleErrorStep()
        setIsError(true)
      }
    }
  }, [dataCreate])

  return (
    <BaseLayout
      breadcrumb={[
        { label: "Home", route: "/presentation" },
        { label: "Create Nft Product" },
      ]}
      title=""
    >
      <DauProgress progress={progress} />
      <FormStepOne
        onNextStep={handleNextStep}
        values={values}
        setValues={setValues}
      />
      <FormStepTwo
        onNextStep={handleNextStep}
        onPreviousStep={handlePreviousStep}
        values={values}
        setValues={setValues}
        action={handleCreateNftProduct}
        setDataAction={setDataCreate}
      />
      <ProcessingStep values={values} totalSteps={totalSteps} />
      <ErrorStep values={values} totalSteps={totalSteps} error={isError} />
      <SuccessStep
        values={values}
        totalSteps={totalSteps}
        success={isSuccess}
      />
    </BaseLayout>
  )
}

export default CreateNftProduct
