import { gql } from '@apollo/client';

export const GET_COUNTS = gql`
  query ItemCounts{
    categories{
      totalCount
    },
    plants{
      totalCount
    },
    varieties{
      totalCount
    },
    locations{
      totalCount
    }
  }
`