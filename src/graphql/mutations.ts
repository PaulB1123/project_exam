/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const saveDatabase = /* GraphQL */ `
  mutation SaveDatabase($Database: addDatabase!, $Client: addClient!) {
    saveDatabase(Database: $Database, Client: $Client) {
      Database_name
      Cluster_name
      Database_id
      Cluster_id
      Client {
        Client_code
        Client_country
        Client_name
      }
    }
  }
`;
export const deleteDatabase = /* GraphQL */ `
  mutation DeleteDatabase($Cluster_id: ID, $Database_id: ID!) {
    deleteDatabase(Cluster_id: $Cluster_id, Database_id: $Database_id)
  }
`;
export const updateDatabase = /* GraphQL */ `
  mutation UpdateDatabase($Database_id: ID!, $Database: updateDatabaseInput!) {
    updateDatabase(Database_id: $Database_id, Database: $Database) {
      Database_name
      Status
    }
  }
`;
export const saveModel = /* GraphQL */ `
  mutation SaveModel($Database_id: ID, $Model: addModel!) {
    saveModel(Database_id: $Database_id, Model: $Model) {
      Model_id
      Model_name
      users_table
      clusters_table
      meta_table
      unique_dim_table
      Status
      Database_id
    }
  }
`;
export const deleteModel = /* GraphQL */ `
  mutation DeleteModel($Model_id: ID!) {
    deleteModel(Model_id: $Model_id)
  }
`;
export const updateModel = /* GraphQL */ `
  mutation UpdateModel($Model_id: ID!, $Model: updateModel!) {
    updateModel(Model_id: $Model_id, Model: $Model) {
      Model_id
      Model_name
      users_table
      clusters_table
      meta_table
      unique_dim_table
      Status
      Database_id
    }
  }
`;
export const saveAudience = /* GraphQL */ `
  mutation SaveAudience($Model_id: ID!, $Audience_name: String!) {
    saveAudience(Model_id: $Model_id, Audience_name: $Audience_name) {
      data {
        Url
        Audience {
          Audience_name
          Audience_id
        }
      }
      error {
        type
        message
      }
      StatusCode
    }
  }
`;
export const updateAudienceName = /* GraphQL */ `
  mutation UpdateAudienceName($Audience_id: ID!, $Audience_name: String!) {
    updateAudienceName(
      Audience_id: $Audience_id
      Audience_name: $Audience_name
    ) {
      data {
        Audience_name
        Audience_id
      }
      error {
        type
        message
      }
      StatusCode
    }
  }
`;
export const updateAudience = /* GraphQL */ `
  mutation UpdateAudience($Audience_id: ID!) {
    updateAudience(Audience_id: $Audience_id) {
      data {
        Url
        Audience {
          Audience_name
          Audience_id
        }
      }
      error {
        type
        message
      }
      StatusCode
    }
  }
`;
export const deleteAudience = /* GraphQL */ `
  mutation DeleteAudience($Audience_id: ID!) {
    deleteAudience(Audience_id: $Audience_id) {
      data
      error {
        type
        message
      }
      StatusCode
    }
  }
`;
export const saveReport = /* GraphQL */ `
  mutation SaveReport(
    $Model_id: ID!
    $Report_name: String!
    $Audiences: [saveReportAudienceInput!]!
  ) {
    saveReport(
      Model_id: $Model_id
      Report_name: $Report_name
      Audiences: $Audiences
    ) {
      data {
        Report_id
        Report_name
        meta_table
        createdBy
        createdAt
        Audiences {
          chart_type
          variable_type
          selector
          id
          position
        }
      }
      error {
        type
        message
      }
      StatusCode
    }
  }
`;
export const updateReport = /* GraphQL */ `
  mutation UpdateReport($Report_id: ID!, $Report: updateReportInput!) {
    updateReport(Report_id: $Report_id, Report: $Report) {
      data {
        Report_id
        Report_name
        meta_table
        createdBy
        createdAt
        Audiences {
          chart_type
          variable_type
          selector
          id
          position
        }
      }
      error {
        type
        message
      }
      StatusCode
    }
  }
`;
export const deleteReport = /* GraphQL */ `
  mutation DeleteReport($Report_id: ID!) {
    deleteReport(Report_id: $Report_id) {
      data
      error {
        type
        message
      }
      StatusCode
    }
  }
`;
