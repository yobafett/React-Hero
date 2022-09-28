import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
    const pStyle = {
        'textAlign': 'center',
        'fontWeight': 'bold',
        'fontSize': '24px'
    };
    const linkStyle = {
        'display': 'block',
        'marginTop': '30px',
        'textAlign': 'center',
        'fontWeight': 'bold',
        'fontSize': '24px'
    };

    return (
        <div>
            <ErrorMessage />
            <p style={pStyle}>Page doesn't exist</p>
            <Link to="/" style={linkStyle}>Back to main page</Link>
        </div>
    );
}

export default Page404;