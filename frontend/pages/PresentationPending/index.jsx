/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React from "react"
// @mui material components
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"

// Material Kit 2 React components
import MKBox from "components/MKBox"
import MKTypography from "components/MKTypography"
import MKSocialButton from "components/MKSocialButton"

// Material Kit 2 React examples
// import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter"
import DauHeader from "components/Molecules/layouts/Header"
import FilledInfoCard from "examples/Cards/InfoCards/FilledInfoCard"
// Presentation page sections
import Information from "pages/Presentation/sections/Information"
import DesignBlocks from "pages/PresentationPending/sections/DesignBlocks"
import Pages from "pages/PresentationPending/sections/Pages"
import Testimonials from "pages/PresentationPending/sections/Testimonials"
import Download from "pages/PresentationPending/sections/Download"

// Presentation page components
import BuiltByDevelopers from "pages/PresentationPending/components/BuiltByDevelopers"

// Routes
import routes from "routes"
import footerRoutes from "footer.routes"

// Images
import bgImage from "assets/images/bg-presentation.jpg"
import bgVideo from "assets/video/top-block-bg_1.mp4"

import { useCanister } from "@connect2ic/react"
import { useEffect } from "react"

const videoTag = {
  objectFit: "cover",
  width: "100vw",
  height: "100vh",
  position: "fixed",
  top: "0",
  left: "0",
}
function PresentationPending() {
  const [marketplace_auction, { loading, error }] = useCanister(
    "marketplace_auction",
  )
  const [products, setProducts] = React.useState([])

  const getProducts = async () => {
    const res = await marketplace_auction.GetAuctionPending()
    console.log("resPending", res)
    setProducts(res)
  }

  React.useEffect(() => {
    getProducts()
  }, [])
  return (
    <>
      <DauHeader
        changeColorOnScroll={{
          height: 1,
          color: "transparent",
          shadow: "none",
        }}
        isLogin={false}
      />
      <MKBox
        minHeight="25vh"
        width="100%"
        sx={{
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      >
        <video style={videoTag} autoPlay loop muted>
          <source src={bgVideo} type="video/mp4" />
        </video>
      </MKBox>
      <Card
        sx={{
          mt: -8,
          mb: 8,
          mx: 2,
          backgroundColor: "#8275f52b",
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <DesignBlocks dataApi={products} />
      </Card>
    </>
  )
}

export default PresentationPending
