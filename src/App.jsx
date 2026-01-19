import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'

const Home = lazy(() => import("./pages/Home"))
const OrganizationBoards = lazy(() => import("./pages/OrganizationBoards"))
const BoardStateHistory = lazy(() => import("./pages/BoardStateHistory"))

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {index: true, element: <Home/>},
        {path: ":organizationSlug/boards", element: <OrganizationBoards/>},
        {path: ":organizationSlug/boards/:boardSlug", element: <BoardStateHistory/>}, 
      ]
    },
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App;
