import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Date from '../../components/dates/dates';
import { DiscussionEmbed } from 'disqus-react';

export default function Post({ postData }) {
    const router = useRouter();

    return (
        <>
            <Layout>
                <Head>
                    <title>{postData.title}</title>
                </Head>
                <article className="w-full">
                    <div className="text-center">
                        <small className="text-sm">
                            <Date dateString={postData.date} />
                        </small>
                        <br />
                        <h1 className="tracking-normal text-4xl text-blue-800 font-semibold">
                            {postData.title}
                        </h1>
                    </div>
                    <div
                        className="markdown-content"
                        dangerouslySetInnerHTML={{
                            __html: postData.contentHtml,
                        }}
                    />
                </article>
            </Layout>
            <div className="container mx-auto mt-8 pr-6 pl-6 max-w-screen-md">
                <DiscussionEmbed
                    shortname="ayusharma-github-io"
                    config={{
                        url: `https://learningjs.dev${router.asPath}`,
                        identifier: postData.id,
                        title: postData.title,
                    }}
                />
            </div>
        </>
    );
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}
