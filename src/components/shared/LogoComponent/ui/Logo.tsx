
import styles from './logo.module.css';
import logo from './logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { baseSizeType } from '@/types/base';

export const LogoComponent = ({ size }: { size?: baseSizeType }) => {

    return (
        <Link href="/" className={styles.a}>
            <Image
                src={logo}
                className={`${styles.logo} ${size && styles[`size${size}`]}`}
                alt="Intervals"
            />
        </Link>
    );
}

