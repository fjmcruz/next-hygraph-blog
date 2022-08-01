import { GraphQLClient, gql } from "graphql-request";
import styles from "../../styles/Slug.module.css";

const GRAPHCMS = new GraphQLClient(
  "https://api-ap-northeast-1.graphcms.com/v2/cl50mrjcv10n601um2ytwbzlg/master"
);

const SLUGLIST_QUERY = gql`
  {
    posts {
      slug
    }
  }
`;

const POST_QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      coverPhoto {
        id
        url
      }
      title
      content {
        html
      }
      author {
        id
        name
        avatar {
          url
        }
      }
      datePublished
      slug
    }
  }
`;

export async function getStaticPaths() {
  const { posts } = await GRAPHCMS.request(SLUGLIST_QUERY);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await GRAPHCMS.request(POST_QUERY, { slug });
  const post = data.post;
  return {
    props: {
      post,
    },
    revalidate: 10,
  };
}

const BlogPost = ({ post }) => {
  return (
    <main className={styles.blog}>
      <img
        className={styles.cover}
        src={post.coverPhoto.url}
        alt={post.title}
      />
      <div className={styles.title}>
        <div className={styles.authdetails}>
          <img src={post.author.avatar.url} alt={post.author.name} />
          <div className={styles.authtext}>
            <h6>By {post.author.name} </h6>
            <h6 className={styles.date}>{post.datePublished}</h6>
          </div>
        </div>
        <h2>{post.title}</h2>
      </div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content.html }}
      ></div>
    </main>
  );
};

export default BlogPost;
