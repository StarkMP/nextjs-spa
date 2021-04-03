export default function Modal({
    children = null,
    id = '',
    className = ''
}) {
    return (
        <div id={id} tabIndex='-1' className={`modal fade ${className}`} aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    {children}
                </div>
            </div>
        </div>
    );
}