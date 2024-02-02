export const GET_PAGE_DATA = `#graphql
  query GetPageData($slug: String!) {
    pageByHandle(handle: $slug) {
      id
      title
      body
    }
  }
`;
