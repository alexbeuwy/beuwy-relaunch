export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const PagePartsFragmentDoc = gql`
    fragment PageParts on Page {
  __typename
  hero {
    __typename
    eyebrow
    title_top
    title_mid_before
    title_emphasis
    title_mid_after
    subtitle
    audit_placeholder
    audit_cta
    audit_hint
    secondary_link_label
    meta_response
    meta_slots
  }
  pain {
    __typename
    eyebrow_num
    eyebrow_text
    title_top
    title_emphasis
    title_bottom
    description
    rows {
      __typename
      k
      now
      after
    }
  }
  dream {
    __typename
    title_top
    title_emphasis
    title_bottom
    description
    image_src
    image_alt
    image_caption
    image_prompt
  }
  mechanism {
    __typename
    title_top
    title_bottom_before
    title_emphasis
    title_bottom_after
    description
    input_chip
    output_chip
    output_meta
    layers {
      __typename
      num
      t
      sub
      out
    }
  }
  proof {
    __typename
    title_emphasis
    title_top_after
    title_bottom
    description
    counters {
      __typename
      prefix
      value
      suffix
      display
      label
      source
    }
    cases {
      __typename
      client
      years
      kpi
      kpiLabel
      note
      href
    }
    testimonials_eyebrow
    founder_eyebrow
    founder_bio
    founder_initials
    founder_name
    founder_role
    founder_quote
  }
  offer {
    __typename
    title_top
    title_emphasis
    title_bottom
    deliverables {
      __typename
      t
      d
    }
  }
  scarcity {
    __typename
    title_top
    title_emphasis
    title_mid
    title_bottom
    description
    cta_label
    cta_href
    slots {
      __typename
      q
      state
    }
  }
  identification {
    __typename
    eyebrow_num
    eyebrow_text
    title_top
    title_bottom_before
    title_emphasis
    title_bottom_after
    cards {
      __typename
      n
      t
      s
    }
    kicker
  }
  magnet {
    __typename
    title_top
    title_emphasis
    title_bottom
    description
    audit_placeholder
    audit_cta
    audit_hint
  }
  bigCta {
    __typename
    title_top
    title_emphasis
    primary_label
    primary_href
    secondary_label
    secondary_href
    meta
  }
}
    `;
export const PageDocument = gql`
    query page($relativePath: String!) {
  page(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageParts
  }
}
    ${PagePartsFragmentDoc}`;
export const PageConnectionDocument = gql`
    query pageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageFilter) {
  pageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageParts
      }
    }
  }
}
    ${PagePartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    page(variables, options) {
      return requester(PageDocument, variables, options);
    },
    pageConnection(variables, options) {
      return requester(PageConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4001/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
