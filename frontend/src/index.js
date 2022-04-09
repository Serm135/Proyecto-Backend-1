import { createRoot } from 'react-dom/client';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import './styles/main.scss';
import {Login, Register, Dashboard, Profile, NewPost, Post, NotFound, Cart, History} from "./pages";
import {Header} from "./components/header";
import {Provider} from "react-redux";
import store from "./services/store";
import {URLChanger} from "./components/urlchanger";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route exact path="/" element={<Dashboard />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/profile/:id" element={<Profile />} />

                <Route path="/new-post" element={<NewPost />} />
                <Route path="/product/:id" element={<Post />} />

                <Route path="/cart" element={<Cart />} />

                <Route path="/history" element={<History />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
            <URLChanger/>
        </BrowserRouter>
    </Provider>
);