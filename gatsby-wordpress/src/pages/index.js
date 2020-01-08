import React, {Component} from "react"
import { Link, graphql } from "gatsby"



class IndexPage extends Component {
  render() {
    const data = this.props.data
    
    return (
      <>
        <div>
          <h1>Index Page</h1>
          {data.allWordpressPages.edges.map(({ node }) => (
            <div key={node.slug}>
              <Link to={node.slug}>
                <h2>{node.title}</h2>
              </Link>
              <h3>{node.excerpt}</h3>
            </div>
          ))}
        </div>

        <h1>Posts</h1>
        {data.allWordpressPages.edges.map(({ node }) => (
          <div key={node.slug}>
            <Link to={node.slug}>
              <h2>{node.title}</h2>
            </Link>
          </div>
        ))}
      </>
    )
  }
}

export default IndexPage;


export const pageQuery = graphql`
  query {
    allWordpressPage {
      edges {
        node {
          id
          title
          excerpt
          slug
        }
      }
    }
    allWordpressPost {
      edges {
        node {
          title
          excerpt
          slug
        }
      }
    }
  }
  `