import React from "react"
import { Link } from "react-router-dom"

import MKBox from "components/MKBox"
import MKTypography from "components/MKTypography"
import MKButton from "components/MKButton"

import image1 from "assets/images/products/product-1-min.jpg"
import image2 from "assets/images/products/product-2-min.jpg"
import image3 from "assets/images/products/product-3-min.jpg"
import image4 from "assets/images/products/product-5-min.jpg"
import image5 from "assets/images/products/product-6-min.jpg"

import { Container, Grid, Typography } from "@mui/material"

import AddIcon from "@mui/icons-material/Add"

function Collection({ items }) {
  return (
    <Container sx={{ my: 3 }}>
      <MKBox component="section" p={4} bgColor="grey-100">
        <Grid container>
          <Typography variant="h3" textAlign="center" mr={4}>
            My Collections
          </Typography>
          <MKButton
            variant="contained"
            color="light"
            size="medium"
            component={Link}
            to={"/collection/mint"}
          >
            <AddIcon sx={{ mr: 2 }} />
            Add
          </MKButton>
        </Grid>
        {items && items.length ? (
          <Grid container>
            {items.map((item) => (
              <Grid item xs={4}>
                <MKBox
                  component="section"
                  bgColor="grey-100"
                  p={3}
                  pt={0}
                  pb={4}
                  shadow="md"
                  borderRadius="xl"
                  m="16px"
                  mt="56px"
                >
                  <MKBox
                    component="img"
                    src={item.url}
                    alt=""
                    width="100%"
                    height="150px"
                    mt="-40px"
                    mb="20px"
                    sx={{ objectFit: "cover", borderRadius: "5px" }}
                  />
                  <MKTypography variant="h5">{item.name}</MKTypography>
                  <MKTypography
                    variant="h6"
                    sx={{
                      display: "block",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.id}
                  </MKTypography>
                </MKBox>
              </Grid>
            ))}
          </Grid>
        ) : (
          <MKBox
            component="section"
            my={4}
            sx={{
              height: "300px",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              borderRadius: 1,
            }}
          >
            <Typography variant="h5" color="error">
              You have no products in your collection.
            </Typography>
          </MKBox>
        )}
      </MKBox>
    </Container>
  )
}

export default Collection
