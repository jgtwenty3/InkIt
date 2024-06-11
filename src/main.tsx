
import ReactDOM from 'react-dom/client'
import App from "./App";
import {BrowserRouter} from "react-router-dom"
import { QueryProvider } from './lib/react.query/QueryProvider';
import { AuthProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <QueryProvider>
            <GoogleOAuthProvider clientId = "867839459724-3nprohdfq412lpco8mh2976quj6ca3e5.apps.googleusercontent.com">
            <AuthProvider>
                <App/>
            </AuthProvider>
            </GoogleOAuthProvider>
        </QueryProvider> 
    </BrowserRouter>
)