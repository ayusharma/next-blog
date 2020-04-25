import Head from 'next/head';
import Link from 'next/link';
import styles from './layout.module.css';

export const siteTitle = 'Learning JS';

export default function Layout({ children, home }) {
    return (
        <div className="container mx-auto mt-8 font-serif pr-6 pl-6">
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content="Learning JS" />
                <meta property="og:image" content="" />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=UA-55642689-2"
                    type="text/javascript"
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html:
                            "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments)} gtag('js', new Date()); gtag('config', 'UA-55642689-2');",
                    }}
                />
            </Head>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">
                        <a>← Back to home</a>
                    </Link>
                </div>
            )}
            {home && (
                <header className={styles.header}>
                    <h1 className="text-5xl font-bold text-gray-900">Notes</h1>
                </header>
            )}
            <main className="flex justify-center mt-10">{children}</main>
        </div>
    );
}
