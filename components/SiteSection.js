import PropTypes from 'prop-types';

SiteSection.propTypes = {
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
    id: PropTypes.string
};

export default function SiteSection({
    title,
    children = null,
    className = '',
    id = ''
}) {
    return (
        <section id={id} className={`site__section ${className}`}>
            <h2 className='site__section-title'>{title}</h2>
            {children}
        </section>
    );
}