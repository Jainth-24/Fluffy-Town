import { storefront } from "@site/utilities/storefront";

export async function fetchCollectionList(cursor?: string) {
    const { collections } = await storefront.query({
      collections: [
        { first: 12, after: cursor || null },
        {
          pageInfo: {
            hasNextPage: true,
          },
          edges: {
            cursor: true,
            node: {
              id: true,
              title: true,
              featuredImage: {
                url: [{ transform: { maxWidth: 500 } }, true],
                altText: true,
                width: true,
                height: true,
              },
            },
          },
        },
      ],
    });
  
    return collections;
  }