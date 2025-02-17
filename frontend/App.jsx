import React from "react"
import { useEffect } from "react"
/*
 * Connect2ic provides essential utilities for IC app development
 */
import { createClient } from "@connect2ic/core"
import { defaultProviders } from "@connect2ic/core/providers"
import "@connect2ic/core/style.css"
import {
  ConnectButton,
  ConnectDialog,
  Connect2ICProvider,
} from "@connect2ic/react"
/*
 * Import canister definitions like this:
 */
import * as dip20 from "canisters/dip20";
import * as dip721 from "canisters/dip721";
import * as marketplace_auction from "canisters/marketplace_auction";
import * as staking from "canisters/staking";
// import * as stake from "../.dfx/local/canisters/stake";
// react-router components
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"

// @mui material components
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

// Material Kit 2 React themes
import theme from "assets/theme"
import Presentation from "layouts/pages/presentation"
import PresentationPending from "layouts/pages/presentationPending"
import Test from "./test"

// Material Kit 2 React routes
import routes from "routes"
import routesHeader from "routes/routesHeader"
//store
import { StoreProvider, useStore, actions } from "./store"
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
/*
 * Some examples to get you started
 */

function App() {
  
  const { pathname } = useLocation()
  const [state, dispatch] = useStore()
  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0

  }, [pathname])
  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse)
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}
          />
        )
      }

      return null
    })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {getRoutes(routes)}
        {getRoutes(routesHeader.isLogout)}
        <Route path="/test" element={<Test />} />
        <Route path="/presentation" element={<Presentation />} />
        <Route path="/presentation-pending" element={<PresentationPending />} />

        <Route path="*" element={<Navigate to="/presentation" />} />
      </Routes>
    </ThemeProvider>
  )
}
const client = createClient({
  canisters: {
    dip20,
    dip721,
    marketplace_auction,
    staking,
    // stake
  },
  providers: defaultProviders,
  globalProviderConfig: {
    /*
     * Disables dev mode in production
     * Should be enabled when using local canisters
     */
    dev: import.meta.env.DEV,
  },
})

console.log("marketplace_auction", marketplace_auction)
const options = {
  position: 'bottom left',
  timeout: 5000,
  offset: '10px',
  transition: 'scale'
}
export default () => (
  <Connect2ICProvider client={client}>
    <Router>
      <AlertProvider template={AlertTemplate} {...options}>
        <StoreProvider>
          <App />
        </StoreProvider>
      </AlertProvider>
    </Router>
  </Connect2ICProvider>
)
