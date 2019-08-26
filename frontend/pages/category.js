/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Error from 'next/error';
import WPAPI from 'wpapi';
import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Menu from '../components/Menu';
import Config from '../config';

const CategoryContainer = styled.div`
  a {
    color: #000;
    text-decoration: none;
  }
  img {
    padding: 0 0 1rem;
  }
  .center {
    display: flex;
    justify-content: center;
  }
  .categoryHead {
    text-align: center;
  }
  .postLayout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: auto auto;
    justify-items: center;
  }
  .postInfo {
    display: flex;
    flex-direction: column;
  }
`;

const CategoryPost = styled.div`
  padding: 18px 13px;
  max-width: 625px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const wp = new WPAPI({ endpoint: Config.apiUrl });

class Category extends Component {
  static async getInitialProps(context) {
    const { slug } = context.query;

    const categories = await wp
      .categories()
      .slug(slug)
      .embed();

    if (categories.length > 0) {
      const posts = await wp
        .posts()
        .category(categories[0].id)
        .embed();
      return { categories, posts };
    }

    return { categories };
  }

  render() {
    const { categories, posts, headerMenu } = this.props;
    if (categories.length === 0) return <Error statusCode={404} />;

    const fposts = posts.map(post => {
      const featuredImage =
        post._embedded['wp:featuredmedia'][0].media_details.sizes.medium
          .source_url;

      return (
        <CategoryPost key={post.id}>
          <div className="center">
            <a href={`/post?slug=${post.slug}&apiRoute=post`}>
              <img width="450" height="280" src={featuredImage} alt="" />
            </a>
          </div>
          <div className="postInfo">
            <Link
              as={`/post/${post.slug}`}
              href={`/post?slug=${post.slug}&apiRoute=post`}
            >
              <a>{post.title.rendered}</a>
            </Link>
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: post.excerpt.rendered,
              }}
            />
          </div>
        </CategoryPost>
      );
    });

    console.log(posts);
    console.log(categories);

    return (
      <Layout>
        <Menu menu={headerMenu} />
        <CategoryContainer>
          <div className="center">
            <img src={categories[0].acf.image.sizes.medium} alt="placeholder" />
          </div>
          <h1 className="categoryHead">{categories[0].name}</h1>
          <div className="postLayout">{fposts}</div>
        </CategoryContainer>
      </Layout>
    );
  }
}

export default PageWrapper(Category);
