// construct site pages by implementing the createPages API. When this is called, your data has already been fetched and is available to query with GraphQL. Gatsby uses GraphQL at build time; Your source plugin (in this case, gatsby-source-wordpress) fetches your data, and Gatsby uses that data to ”automatically infer a GraphQL schema” that you can query against.

 const path = require(`path`);
 const slash = require(`slach`);

 exports.createPages = async({ graphql, actions }) => {
   const { createPage } = actions
   // query content for WordPress posts
   const result = await graphql(`
   query {
     allWordpressPost {
       edges {
         node {
           id
           slug
         }
       }
     }
   }
   `)

   const postTemplate = path.resolve(`./src/templates/post.js`);

   // After fetching data from WordPress via the query, all posts are iterated over, calling createPage for each one.
   result.data.allWordpressPost.edges.forEach(edge => {
    createPage({
      //will be the url of the page
      path: edge.node.slug,
      // specify the component template of your choice
      component: slash(postTemplate),
      // In the teamplate's GraphQL query, 'id will be available as GraphQL var to query for this posts's data  
      context: {
        id: edge.node.id,
      }  
    })
   })
 }