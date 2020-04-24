import Head from 'next/head';
import Link from 'next/link';
import Date from '../components/dates/dates';
import { getSortedPostsData } from '../lib/posts';
import Layout, { siteTitle } from '../components/layout/layout';

export default function Home({ allPostsData }) {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section>
                <ul>
                    {allPostsData.map(({ id, date, title }) => (
                        <li
                            key={id}
                            className="mb-6 pointer-events-auto text-gray-700"
                        >
                            <small className="text-sm">
                                <Date dateString={date} />
                            </small>
                            <br />
                            <Link href="/posts/[id]" as={`/posts/${id}`}>
                                <a className="tracking-normal text-2xl text-blue-800 no-underline hover:underline">
                                    {title}
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    );
}

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
}
