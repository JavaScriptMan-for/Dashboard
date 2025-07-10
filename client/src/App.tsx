import { FC } from "react"
import { Routes, Route } from "react-router-dom"
import "@styles/main.scss"

//Layouts
import MainLayout from "@layouts/MainLayout"

//Pages
import IndexRedirect from "@pages/IndexRedirect"
import LoginPage from "@pages/LoginPage"

const App: FC = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<IndexRedirect />} />
            <Route index path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
