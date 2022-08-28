import React, { useEffect, useState } from "react"

// Import component MUI
import Container from "@mui/material/Container"

import DauHeader from "components/Molecules/layouts/Header"
import DauProgress from "components/Molecules/layouts/ProgressBar"
import {
  FormStepOne,
  FormStepTwo,
} from "components/Molecules/layouts/Form/CreateRealProduct"
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

function CreateRealProduct() {
  const [marketplace_auction, { loadingDip721, errorDip721 }] = useCanister(
    "marketplace_auction",
    {
      mode: "anonymous",
    },
  )
  const { principal } = useConnect()

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
  const [errorMessage, setErrorMessage] = useState("")

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

  const handleCreateRealProduct = async (values) => {
    try {
      const cid = await uploadToWeb3Storage(values.file)
      console.log(values.currency)
      if (principal) {
        return await marketplace_auction.AddOrder(
          Principal.fromText(principal),
          "REAL_PRODUCT",
          values.title,
          BigInt(1),
          values.description,
          BigInt(values.stepBid),
          BigInt(values.startPrice),
          values.currency,
          convertDaysToMiliSeconds(values.duration),
          values.file
            .map((file) => {
              return replaceString(STRING_TOKEN, { cid: cid, name: file.name })
            })
            .join(" "),
          replaceString(STRING_TOKEN, { cid: cid, name: values.file[0].name }),
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
      setErrorMessage("Server Error")
    }
  }

  const onReInput = () => {
    setValues({
      s1: {
        title: "",
        description: "",
        duration: 1,
        startPrice: "",
        stepBid: "",
        currency: "none",
      },
    })
    setProgress(defaultRoutes.createRealProduct)
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
        setErrorMessage(Object.keys(dataCreate.Err)[0])
      }
    }
  }, [dataCreate])

  return (
    <BaseLayout
      breadcrumb={[
        { label: "Home", route: "/presentation" },
        { label: "Create Real Product" },
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
        action={handleCreateRealProduct}
        setDataAction={setDataCreate}
      />
      <ProcessingStep values={values} totalSteps={totalSteps} />
      <ErrorStep
        values={values}
        totalSteps={totalSteps}
        error={isError}
        errorMessage={errorMessage}
        routeOk={"/presentaion-pending"}
        onClickReinput={onReInput}
      />
      <SuccessStep
        values={values}
        totalSteps={totalSteps}
        success={isSuccess}
        routeOk={"/presentaion-pending"}
      />
    </BaseLayout>
  )
}

export default CreateRealProduct
