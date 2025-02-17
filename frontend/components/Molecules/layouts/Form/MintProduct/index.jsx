import React, { useState, useRef, useEffect } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
// @mui material components
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"

// Material Kit 2 React components
import MKBox from "components/MKBox"
import MKTypography from "components/MKTypography"
import MKInput from "components/MKInput"
import MKButton from "components/MKButton"
import MKAvatar from "components/MKAvatar"

// Import Icons
import TwitterIcon from "@mui/icons-material/Twitter"
import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"

// Import Image

function MintProduct({ onNextStep, values, setValues, action, setDataAction }) {
  const formik = useFormik({
    initialValues: values.s1,
    validationSchema: yup.object({
      file: yup.mixed().required("A file is required."),
      name: yup.string().required("Field name is required."),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      onNextStep()
      setValues({ s1: values, s2: {} })
      const res = await action(values.file, values.name, values.description)
      setDataAction(res)
    },
  })

  const handleReset = () => {
    formik.handleReset()
  }

  const handleChangeFile = (event) => {
    const files = event.target.files ? [...event.target.files] : []
    if (files.length && files[0]) {
      formik.setFieldValue("file", files[0], false)
      formik.setFieldError("file", "")
    }
  }

  const handleOnClickFile = () => {
    formik.setFieldValue("file", undefined, false)
    setTimeout(() => {
      formik.setFieldError("file", "A file is required")
    }, 1000)
  }

  return Object.keys(values).length === 1 ? (
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
            Add to your collection
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
                  <MKTypography variant="h6" mb={1}>
                    File
                  </MKTypography>
                  <MKInput
                    id="file"
                    type="file"
                    name="file"
                    onClick={(e) => {
                      handleOnClickFile(e)
                    }}
                    onChange={(e) => {
                      handleChangeFile(e)
                    }}
                    error={Boolean(formik.errors.file)}
                    helperText={formik.errors.file}
                    variant="outlined"
                    fullWidth
                    placeholder="Type something"
                  />
                </Grid>
                <Grid item xs={12}>
                  <MKTypography variant="h6" mb={1}>
                    File Name
                  </MKTypography>
                  <MKInput
                    id="name"
                    name="name"
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    helperText={formik.touched.name && formik.errors.name}
                    variant="outlined"
                    fullWidth
                    placeholder="Type something"
                  />
                </Grid>
                <Grid item xs={12}>
                  <MKTypography variant="h6" mb={1}>
                    Description
                  </MKTypography>
                  <MKInput
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    variant="outlined"
                    multiline
                    fullWidth
                    rows={6}
                    placeholder="Type something"
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="end" my={2}>
                <Grid item xs={3} mr={2}>
                  <MKButton
                    type="reset"
                    variant="outlined"
                    color="dark"
                    fullWidth
                  >
                    Reset
                  </MKButton>
                </Grid>
                <Grid item xs={3} ml={2}>
                  <MKButton
                    type="submit"
                    variant="gradient"
                    color="dark"
                    fullWidth
                  >
                    Mint
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

export default MintProduct
