import { FC } from "react"
import { Routes, Route } from "react-router-dom"

//Layouts
import MainLayout from "@layouts/MainLayout"

//Pages
import MainPage from "@pages/MainPage"

const App: FC = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
            <Route index path="/" element={<MainPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
