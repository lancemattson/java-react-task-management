const Button = ({onClick, children, type = 'button'}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className="rounded-md bg-sky-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
        >
            {children}
        </button>
    );
};

export default Button;