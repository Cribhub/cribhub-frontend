import ReactDOM from 'react-dom/client'
import './index.css'
import Login from './Pages/Login'
import reportWebVitals from './reportWebVitals'
import { ToastContainer, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateAccount from './Pages/CreateAccount'
import MainMenu from './Pages/MainMenu'
import JoinCrib from './Pages/JoinCrib'
import CreateCrib from './Pages/CreateCrib'
import flagsmith from 'flagsmith'
import { FlagsmithProvider } from 'flagsmith/react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <>
        <FlagsmithProvider
            options={{
                environmentID: '6fSDRNurbs8g2uViHrBeAq',
            }}
            flagsmith={flagsmith}
        >
            <QueryClientProvider client={queryClient}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route
                                path="/createaccount"
                                element={<CreateAccount />}
                            />
                            <Route path="/mainmenu" element={<MainMenu />} />
                            <Route path="/joinCrib" element={<JoinCrib />} />
                            <Route path="/createCrib" element={<CreateCrib />} />
                        </Routes>
                    </BrowserRouter>
                </ThemeProvider>
                </LocalizationProvider>
            </QueryClientProvider>
        </FlagsmithProvider>

        <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="dark"
            transition={Bounce}
        />
    </>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
