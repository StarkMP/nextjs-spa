import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

Button.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.string,
    loader: PropTypes.bool,
    loaderClassName: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func
};

export default function Button({
    children,
    className = '',
    id = '',
    type = 'button',
    loader = false,
    loaderClassName = '',
    style = {},
    onClick
}) {
    const [loading, setLoading] = useState(loader);

    useEffect(() => setLoading(loader), [loader]);

    return <button
        style={style}
        onClick={onClick}
        type={type}
        id={id}
        className={`btn-component btn ${className}`}
    >
        {loading ? <div className={`spinner-border spinner-border-sm ${loaderClassName}`} role='status' aria-hidden='true'></div> : null}
        {children}
    </button>;
}