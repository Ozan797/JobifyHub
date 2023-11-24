import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Error404 from "./pages/Error404/Error404";
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/add-book" exact element={<AddBook />} />
          <Route path="/catalog" exact element={<Catalog />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} /> */}
          <Route path='*' element={<Error404 />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
