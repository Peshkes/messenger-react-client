import './App.css';
import Registration from "./pages/Registration";
import Loading from "./components/Loading.tsx";
import {useLoading} from "./states/useLoading.ts";
import {useAuthenticate} from "./states/useAuthenticate.ts";
import Main from "./pages/Main.tsx";

const App = () => {

    const {isAuthenticated} = useAuthenticate();
    const {isLoading} = useLoading();

    return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            {
                !isAuthenticated ?
                    <Registration/>:
                    <Main/>
            }
            {isLoading && <Loading/>}
        </div>
    );
};

export default App;
