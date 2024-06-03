import {Link} from "react-router-dom";

const LinkButton = ({children, route}) => {
    return (
        <Link
            to={route}
            className="flex items-center rounded-md bg-sky-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
            {children}
        </Link>
    );
};

export default LinkButton;