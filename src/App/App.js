import './App.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import SignIn from '../SignIn/SignIn';
import SignUp from "../SignUp/signUp";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/SignIn" element={<SignIn/>}/>
                <Route path="/SignUp" element={<SignUp/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
