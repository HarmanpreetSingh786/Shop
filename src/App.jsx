function App () {
  return (
    <MyState>
      <Router>
        <ScrollTop/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/*" element={<NoPage/>} />
          <Route path="/productInfo/:id" element={<ProductInfo/>} />
          <Route path="/category/:categoryname" element={<CategoryPage/>} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/allProduct" element={<AllProduct/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/user-dashboard" element={<ProtectedRouteForUser>
          <UserDashboard/>
        </ProtectedRouteForUser>} />

        <Route path="/admin-dashboard" element={<ProtectedRouteForAdmin>
          <AdminDashboard/>
        </ProtectedRouteForAdmin>} />

        <Route path="/addproduct" element={<ProtectedRouteForAdmin>
          <AddProductPage/>
        </ProtectedRouteForAdmin>} />

        <Route path="/updateproduct/:id" element={<ProtectedRouteForAdmin>
          <UpdateProductPage/>
        </ProtectedRouteForAdmin>} />

        </Routes>
        <Toaster/>
      </Router>
    </MyState>
  )
}

export default App
