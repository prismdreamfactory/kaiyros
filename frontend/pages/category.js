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
import { DatePost } from '../microcomponents/DatePost';

const CategoryContainer = styled.div`
  max-width: 1100px;
  margin: auto;
  a {
    font-size: 1.3rem;
    text-decoration: none;
    color: #000;
  }
  img {
    margin-bottom: 1rem;
  }
  .categoryTitle {
    margin-bottom: 4rem;
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

  @media (min-width: 0px) and (max-width: 1024px) {
    margin-top: 5rem;
    .postLayout {
      grid-template-columns: 1fr;
    }
  }
`;

const CategoryPost = styled.div`
  padding: 18px 13px;
  max-width: 625px;
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    object-fit: cover;
  }

  .title {
    font-size: 1.5rem;
    text-transform: uppercase;
  }
`;

const FeaturedContent = styled.div`
  display: flex;
  max-width: 2000px;
  margin: 2rem auto;
  justify-content: space-evenly;

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 2rem;
    max-width: 540px;
  }

  .title {
    font-size: 1.5rem;
    text-transform: uppercase;
  }

  @media (min-width: 0px) and (max-width: 1024px) {
    flex-direction: column;
    img {
      width: 100%;
    }
  }
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

    // make array of sticky posts
    const ftrposts = posts.filter(ftrpost => ftrpost.sticky === true);

    // make array of non-sticky posts
    const regposts = posts.filter(regpost => regpost.sticky !== true);

    const stickycontent = ftrposts.map(stickypost => {
      const stickyImage =
        stickypost._embedded['wp:featuredmedia'][0].media_details.sizes
          .medium_large.source_url;

      return (
        <FeaturedContent key={stickypost.id}>
          <a href={`/post?slug=${stickypost.slug}&apiRoute=post`}>
            <img src={stickyImage} alt="" />
          </a>
          <div className="content">
            <div>
              <Link
                as={`/post/${stickypost.slug}`}
                href={`/post?slug=${stickypost.slug}&apiRoute=post`}
              >
                <a className="title">{stickypost.title.rendered}</a>
              </Link>
            </div>
            <DatePost datesrc={stickypost.date} />
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: stickypost.excerpt.rendered,
              }}
            />
          </div>
        </FeaturedContent>
      );
    });

    const fposts = regposts.map(post => {
      const featuredImage =
        post._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large
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
              <a className="title">{post.title.rendered}</a>
            </Link>
            <DatePost datesrc={post.date} />
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

    console.log('categories menu', this.props.categoriesMenu);
    console.log('cat', categories);
    console.log('posts', posts);

    return (
      <Layout {...this.props}>
        <Menu menu={headerMenu} />
        <CategoryContainer>
          <div className="categoryTitle">
            <div className="center">
              <img
                src={categories[0].acf.image.sizes.medium}
                alt="placeholder"
              />
            </div>
            <h1 className="categoryHead">{categories[0].name}</h1>
          </div>
          <div>
            <div>{stickycontent}</div>
            <div className="postLayout">{fposts}</div>
          </div>
        </CategoryContainer>
      </Layout>
    );
  }
}

export default PageWrapper(Category);
