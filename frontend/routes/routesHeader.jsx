import React from "react"

import CreateSeller from "pages/FormPages/CreateSeller"
import CreateRealProduct from "pages/FormPages/CreateRealProduct"
import CreateNFTProduct from "pages/FormPages/CreateNftProduct"

const routesHeader = {
  isLogin: [
    {
      type: "internal",
      route: "/seller/create",
      component: <CreateSeller />,
      label: "Become a seller",
      color: "info",
      isBtn: false,
      connectBtn: false,
    },
    {
      type: "internal",
      route: "/product/create-real",
      component: <CreateRealProduct />,
      label: "Add product",
      color: "info",
      isBtn: false,
      connectBtn: false,
    },
    {
      type: "internal",
      route: "/product/create-nft",
      component: <CreateNFTProduct />,
      label: "Add NFT",
      color: "info",
      isBtn: false,
      connectBtn: false,
    },
  ],
  isLogout: [
    {
      type: "internal",
      route: "/seller/create",
      component: <CreateSeller />,
      label: "Become a seller",
      color: "info",
      isBtn: false,
      connectBtn: false,
    },
    {
      type: "internal",
      route: "/product/create-real",
      component: <CreateRealProduct />,
      label: "Add product",
      color: "info",
      isBtn: false,
      connectBtn: false,
    },
    {
      type: "internal",
      route: "/product/create-nft",
      component: <CreateNFTProduct />,
      label: "Add NFT",
      color: "info",
      isBtn: false,
      connectBtn: false,
    },
    {
      type: "external",
      route: "/connect",
      component: <></>,
      label: "Connect to wallet",
      color: "info",
      isBtn: true,
      connectBtn: true,
    },
  ],
  subHeaders: [
    {
      label: "All products",
      color: "secondary",
      route: "/presentation",
      component: <></>,
    },
    {
      label: "Pending products",
      color: "secondary",
      route: "/presentation-pending",
      component: <></>,
    },
  ],
}

export default routesHeader
