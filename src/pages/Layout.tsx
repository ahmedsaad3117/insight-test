import React, { useEffect, useState } from "react"
import { useSession, signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { isUserLoggedIn } from "../utils/authManager";
import Head from "next/head"
import NextNprogress from "nextjs-progressbar"
import { GridLoader } from "react-spinners";
import Header from "../components/Header"
import { Container, Row } from "react-bootstrap";
// import SvgIcons from "./SvgIcons"
// import Sidebar from "./Sidebar"
// import Footer from "./Footer"

const Layout = (pageProps: any) => {
  const { data: session } = useSession();
  
  const [sidebarShrink, setSidebarShrink] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [checkingSession, setCheckingSession] = useState(true);
  
  useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
      return;
    }

    if (!isUserLoggedIn(session!)) signIn("keycloak");
    else setCheckingSession(false);

  }, [session]);

  return (
    <div className={pageProps.className} style={{ width: '100%' }}>
      { checkingSession ?
        <Row style={{ alignItems: 'center', height: '100%' }}>
          <Container style={{ width: 57, boxSizing: 'content-box' }}>
            <GridLoader color="#3A3985" size={30} />
            {/* <NextNprogress color="#4E66F8" options={{ showSpinner: true }} /> */}
          </Container>
        </Row> :
        <Header
          setSidebarShrink={setSidebarShrink}
          sidebarShrink={sidebarShrink}
        />
      }

      {/* <div className="d-flex align-items-stretch">
        <Sidebar sidebarShrink={sidebarShrink} />
        <div
          className={`page-holder ${
            pageProps.pageHolderClass
              ? pageProps.pageHolderClass
              : "bg-gray-100"
          }`}
        >
          {pageProps.children}
          <Footer />
        </div>
      </div>
      <SvgIcons /> */}
    </div>
  )
}

export default Layout
