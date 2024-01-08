import { GraphQLClient, gql } from "graphql-request";

import { Mutation } from "../types/generated/types";

const RESTORE_ACCESS_TOKEN = gql`
  mutation {
    restoreAccessToken {
      accessToken
    }
  }
`;

export const getAccessToken = async (): Promise<string | undefined> => {
  try {
    const graphQLClient = new GraphQLClient(
      "https://backend-practice.codebootcamp.co.kr/graphql",
      { credentials: "include" }
    );

    const result = await graphQLClient.request<
      Pick<Mutation, "restoreAccessToken">
    >(RESTORE_ACCESS_TOKEN);

    const newAccessToken = result?.restoreAccessToken.accessToken;
    console.log("New Access Token:", newAccessToken);

    return newAccessToken;
  } catch (error) {
    // 클라이언트에서 발생한 에러
    console.error("Error fetching access token:", error);
    return undefined;
  }
};
