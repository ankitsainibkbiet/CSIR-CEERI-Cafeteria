import './index.css'
import App from './App.jsx'
import { createRoot } from 'react-dom/client'
import HomePage from './Pages/HomePage.jsx'
import SignupPage from './Pages/SignupPage.jsx'
import LoginPage from './Pages/LoginPage.jsx'
import CartPage from './Pages/CartPage.jsx'
import OrderPage from './Pages/OrderPage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import EditPage from './Pages/EditPage.jsx'
import CreatePage from './Pages/CreatePage.jsx'
import AdminDashboard from './Pages/AdminPage.jsx'

const router = createBrowserRouter([
  {path: "/", element: <App/>, children: [
    {path: "/", element: <HomePage/>},
    {path: "/signup", element: <SignupPage/>},
    {path: "/login", element: <LoginPage/>},
    {path: "/cart", element: <CartPage/>},
    {path: "/order", element: <OrderPage/>},
    {path: "/admin/edit/:id", element: <EditPage/>},
    {path: "/admin/create", element: <CreatePage/>},
    {path: "/admin", element: <AdminDashboard/>},
  ]}
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
