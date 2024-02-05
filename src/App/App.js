import './App.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import SignIn from '../SignIn/SignIn';
import SignUp from "../SignUp/signUp";
import FeedPage from '../PostFeed/FeedPage/FeedPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn/>}/>
                <Route path="/SignUp" element={<SignUp/>}/>
                <Route path="/FeedPage" element={<FeedPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
