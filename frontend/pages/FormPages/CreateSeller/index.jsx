import React, { useEffect, useState } from "react"

import Container from "@mui/material/Container"

import DauHeader from "components/Molecules/layouts/Header"
import DauProgress from "components/Molecules/layouts/ProgressBar"
import Seller from "components/Molecules/layouts/Form/CreateSeller"
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

function CreateSeller() {
  const [marketplace_auction, { loadingMarket, errorMarket }] = useCanister(
    "marketplace_auction",
    {
      mode: "anonymous",
    },
  )
  const { principal } = useConnect()

  const totalSteps = defaultRoutes.createSeller.length
  const [progress, setProgress] = useState(defaultRoutes.createSeller)
  const [values, setValues] = useState({
    s1: {
      username: "",
      email: "",
      photo: {},
      description: "",
      twitter: "",
      facebook: "",
      instagram: "",
    },
  })
  const [dataCreate, setDataCreate] = useState()
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleNextStep = () => {
    const nextProgress = defaultRoutes.functions.nextStep(progress)
    setProgress([...nextProgress])
  }

  const handleErrorStep = () => {
    const nextProgress = defaultRoutes.functions.nextErrorStep(progress)
    setProgress([...nextProgress])
  }

  const handleCreateSeller = async (values) => {
    try {
      let cid = ""
      values.photo.name && (cid = await uploadToWeb3Storage([values.photo]))
      const data = {
        username: values.username,
        description: values.description,
        email: values.email,
        locationTime: "None",
        avatar: cid.length
          ? replaceString(STRING_TOKEN, {
              cid: cid,
              name: values.photo.name,
            })
          : cid,
        social: `${values.twitter},${values.facebook},${values.instagram}`,
      }
      console.log(data)
      if (principal) {
        return await marketplace_auction.BecomeTheSeller(
          Principal.fromText(principal),
          data,
        )
      }
    } catch (error) {
      console.log(error)
      handleErrorStep()
      setIsError(true)
      setValues((currentValues) => {
        return {
          ...currentValues,
          s3: {},
        }
      })
    }
  }

  useEffect(() => {
    if (dataCreate) {
      console.log(dataCreate)
      setValues((currentValues) => {
        return {
          ...currentValues,
          s3: {},
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
        { label: "Become a Seller" },
      ]}
      title=""
    >
      <DauProgress progress={progress} />
      <Seller
        onNextStep={handleNextStep}
        values={values}
        setValues={setValues}
        action={handleCreateSeller}
        setDataAction={setDataCreate}
      />
      <ProcessingStep values={values} totalSteps={totalSteps} />
      <ErrorStep values={values} totalSteps={totalSteps} error={isError} />
      <SuccessStep
        values={values}
        totalSteps={totalSteps}
        success={isSuccess}
        onClickOke={""}
      />
    </BaseLayout>
  )
}

export default CreateSeller
