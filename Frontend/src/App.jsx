import Container from "./Components/Container"
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import { Outlet } from "react-router-dom"
import ScrollToTop from "./ScrollToTop.js"

function App() {
  return (
    <>
      <Container>
        <ScrollToTop/>
        <Header />
        <Outlet />
        <Footer />
      </Container>
    </>
  )
}

export default App
