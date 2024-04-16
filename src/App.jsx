import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
/* import { ReactQueryDevtools } from "@tanstack/react-query-devtools" */
import { Toaster } from "react-hot-toast"

import GlobalStyles from './styles/GlobalStyles'
import Account from "./pages/Account"
import Bookings from "./pages/Bookings"
import Cabins from "./pages/Cabins"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import PageNotFound from "./pages/PageNotFound"
import Settings from "./pages/Settings"
import Users from "./pages/Users"
import AppLayout from "./ui/AppLayout"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0
    }
  }
})

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false}/> */}
        <GlobalStyles/>
        <BrowserRouter>
          <Routes>

            <Route element={<AppLayout />}>
              <Route index element={ <Navigate replace to='dashboard' /> }/>
              <Route path='account' element={ <Account/> }/>
              <Route path='bookings' element={ <Bookings/> }/>
              <Route path='cabins' element={ <Cabins/> }/>
              <Route path='dashboard' element={ <Dashboard/> }/>
              <Route path='settings' element={ <Settings/> }/>
              <Route path='users' element={ <Users/> }/>
            </Route>
            
            <Route path='login' element={ <Login/> }/>
            <Route path='*' element={ <PageNotFound/> }/>
            
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          reverseOrder={false}
          containerStyle={{ margin: '.5rem' }}
          toastOptions={{
            success: {
              duration: 3000
            },
            error: {
              duration: 5000
            },
            style: {
              fontSize: '1.2rem',
              maxWidth: '640px',
              padding: '1rem 2rem',
              backgroundColor: 'var(--color-grey-50)',
              color: 'var(--color-grey-700)'
            }
          }}
          />
      </QueryClientProvider>
  )
}

export default App