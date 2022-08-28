import React, { useState, useRef, useEffect } from "react"
import { useFormik } from "formik"
import * as yup from "yup"

// @mui material components
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Input from "@mui/material/Input"

// Material Kit 2 React components
import MKBox from "components/MKBox"
import MKTypography from "components/MKTypography"
import MKInput from "components/MKInput"
import MKButton from "components/MKButton"
import MKAvatar from "components/MKAvatar"
// Import My Custom List component
import MKList from "../MKList"
// Import v4 - uuid
import { v4 } from "uuid"

import { useCanister, useConnect } from "@connect2ic/react"
import { Principal } from "@dfinity/principal"

const getFilesFromMyCustomList = (myCustomList) => {
  const array = []
  myCustomList.map((ele) => array.push(ele["file"]))
  return array
}

function FormStepTwo({
  onNextStep,
  onPreviousStep,
  values,
  setValues,
  action,
  setDataAction,
}) {
  const [dataFetch, setDataFetch] = useState([
    { id: "none", name: "None", url: "" },
  ])
  const { principal } = useConnect()
  const [dip721, { loadingDip721, errorDip721 }] = useCanister("dip721", {
    mode: "anonymous",
  })

  useEffect(async () => {
    try {
      console.log(principal, "principal")
      if (principal) {
        const res = await dip721.getMyNfts(Principal.fromText(principal))
        setDataFetch([{ id: "none", name: "None", url: "" }, ...res])
      }
    } catch (error) {
      console.log(error)
    }
  }, [principal])

  const formik = useFormik({
    initialValues: {
      tokenId: "none",
    },
    validationSchema: yup.object({
      tokenId: yup
        .number()
        .typeError("Must be select one product from your collection"),
    }),
    enableReinitialize: true,
    onSubmit: async (formikValues) => {
      onNextStep()
      setValues({
        ...values,
        s2: {
          ...formikValues,
        },
        s3: {},
      })
      const expectInput = {
        ...values.s1,
        ...formikValues,
      }
      const res = await action(expectInput)
      console.log(res)
      setDataAction(res)
    },
  })

  const [imgObj, setImgObj] = useState({ url: "", id: "" })

  const handleOnClick = (imgObj) => {
    setImgObj(imgObj)
    formik.setFieldValue("tokenId", imgObj.id, false)
  }

  const handleReset = () => {}

  const handleBack = () => {
    setValues({
      s1: values.s1,
    })
    onPreviousStep()
  }

  return Object.keys(values).length === 2 ? (
    <MKBox
      component="section"
      bgColor="grey-100"
      p={4}
      shadow="md"
      borderRadius="xl"
      my={3}
    >
      <Container>
        <Grid
          container
          item
          justifyContent="center"
          xs={10}
          lg={7}
          mx="auto"
          textAlign="center"
        >
          <MKTypography variant="h3" mb={1}>
            Create Product
          </MKTypography>
        </Grid>
        <Grid container item xs={12} lg={10} sx={{ mx: "auto" }}>
          <MKBox
            width="100%"
            component="form"
            method="post"
            autoComplete="off"
            onSubmit={formik.handleSubmit}
            onReset={handleReset}
          >
            <MKBox p={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MKTypography variant="h5" mb={1}>
                    Select product from collections
                  </MKTypography>
                </Grid>
                <Grid item xs={3}>
                  <MKBox
                    shadow="inset"
                    p={2}
                    bgColor="grey-100"
                    sx={{ height: "350px" }}
                  >
                    <MKList
                      items={dataFetch}
                      handleOnClick={handleOnClick}
                      dense
                    />
                  </MKBox>
                </Grid>
                <Grid item xs={9}>
                  <MKBox
                    shadow="inset"
                    py={2}
                    bgColor="grey-100"
                    sx={{
                      height: "350px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    {imgObj.url.length ? (
                      <img
                        src={imgObj.url}
                        alt={imgObj.id}
                        loading="lazy"
                        style={{
                          margin: "auto",
                          display: "block",
                          height: "318px",
                          width: "318px",
                          objectFit: "contain",
                        }}
                        key="img-field"
                      />
                    ) : null}
                    {formik.errors.tokenId && (
                      <MKTypography
                        mx={2}
                        sx={{ position: "absolute", bottom: "0" }}
                        color="error"
                      >
                        {formik.errors.tokenId}
                      </MKTypography>
                    )}
                  </MKBox>
                </Grid>
              </Grid>
              <Grid container justifyContent="end" mt={4}>
                <Grid item xs={3} mx={2}>
                  <MKButton
                    type="reset"
                    variant="gradient"
                    color="light"
                    fullWidth
                    onClick={handleBack}
                  >
                    Back
                  </MKButton>
                </Grid>
                <Grid item xs={3} ml={2}>
                  <MKButton
                    type="submit"
                    variant="gradient"
                    color="dark"
                    fullWidth
                  >
                    Send
                  </MKButton>
                </Grid>
              </Grid>
            </MKBox>
          </MKBox>
        </Grid>
      </Container>
    </MKBox>
  ) : null
}

export default FormStepTwo
