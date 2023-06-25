import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Date from '../components/date';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.heading}>
        <p>こんにちは。見つかりましたね。久しぶりにBlogでも書くか、、と思い作りました🤣なんかちょこちょこ思いついたことを書いていきます。取り止めのない話を書いているだけですが、読んで気になることがあったらTwitterででも教えてください笑。なお、このWebサイトの内容は全て個人的な意見であり、会社や法人の意見を代表するものでありません。念の為🙇🏻‍♂️</p>
        <ul>
          <li><a href={'https://github.com/kuzukawa/'} target={'_blank'}>Github</a></li>
          <li><a href={'https://twitter.com/kkuzu'} target={'_blank'}>Twitter</a></li>
        </ul>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title}) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
            ))}
        </ul>
      </section>
    </Layout>
  );
}
