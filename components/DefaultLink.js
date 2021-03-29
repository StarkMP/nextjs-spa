import Link from 'next/link';

export default function DefaultLink({ children, href, className }) {
    return <Link href={href}><a className={className}>{children}</a></Link>;
}