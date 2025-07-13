import { FC } from "react"
import { Routes, Route } from "react-router-dom"


//Layouts
import MainLayout from "@layouts/MainLayout"

//Pages
import IndexRedirect from "@pages/IndexRedirect"
import LoginPage from "@pages/LoginPage"
import RegisterPage from "@pages/RegisterPage"

const App: FC = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
            <Route index path="/" element={<IndexRedirect />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
