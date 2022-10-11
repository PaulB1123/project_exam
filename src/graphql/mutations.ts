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
  mutation SaveAudience(
    $Database_id: ID!
    $meta_table: String!
    $Audience_name: String!
  ) {
    saveAudience(
      Database_id: $Database_id
      meta_table: $meta_table
      Audience_name: $Audience_name
    )
  }
`;
export const saveReport = /* GraphQL */ `
  mutation SaveReport(
    $Client_code: String!
    $Model_id: ID!
    $Report_name: String!
    $Audiences: [saveReportAudience!]!
  ) {
    saveReport(
      Client_code: $Client_code
      Model_id: $Model_id
      Report_name: $Report_name
      Audiences: $Audiences
    ) {
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
  }
`;
export const updateReport = /* GraphQL */ `
  mutation UpdateReport(
    $Client_code: String!
    $Report_id: ID!
    $Report: updateReport!
  ) {
    updateReport(
      Client_code: $Client_code
      Report_id: $Report_id
      Report: $Report
    ) {
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
  }
`;
export const deleteReport = /* GraphQL */ `
  mutation DeleteReport($Report_id: ID!) {
    deleteReport(Report_id: $Report_id)
  }
`;
