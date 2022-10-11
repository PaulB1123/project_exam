/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDatabaseById = /* GraphQL */ `
  query GetDatabaseById($Status: Status, $Database: getDatabaseById!) {
    getDatabaseById(Status: $Status, Database: $Database) {
      Cluster_id
      Databases {
        Database_id
        Database_name
        Cluster_id
        Client_code
        Status
      }
    }
  }
`;
export const getDatabaseByName = /* GraphQL */ `
  query GetDatabaseByName(
    $Status: Status
    $Database: getDatabaseByName!
    $Client: getClient
  ) {
    getDatabaseByName(Status: $Status, Database: $Database, Client: $Client) {
      Cluster_id
      Databases {
        Database_id
        Database_name
        Cluster_id
        Client_code
        Status
      }
    }
  }
`;
export const getModel = /* GraphQL */ `
  query GetModel(
    $Status: Status
    $Database_id: ID
    $Model_id: ID
    $Model_name: String
  ) {
    getModel(
      Status: $Status
      Database_id: $Database_id
      Model_id: $Model_id
      Model_name: $Model_name
    ) {
      Model_id
      Model_name
      meta_table
      users_table
      clusters_table
      unique_dim_table
      Client_code
      Database_id
      Status
    }
  }
`;
export const getClients = /* GraphQL */ `
  query GetClients {
    getClients {
      Client_name
      Client_code
    }
  }
`;
export const getModelsForClient = /* GraphQL */ `
  query GetModelsForClient($Client_code: String!) {
    getModelsForClient(Client_code: $Client_code) {
      Model_id
      Model_name
      Database_id
      meta_table
    }
  }
`;
export const getSelectorsForModel = /* GraphQL */ `
  query GetSelectorsForModel($Model_id: ID!) {
    getSelectorsForModel(Model_id: $Model_id) {
      ... on SelectorFactor {
        variable_type
        id
        selector
        category
        values {
          id
          value
        }
      }
      ... on SelectorNumeric {
        variable_type
        id
        selector
        category
        max
        min
      }
    }
  }
`;
export const getAudiencesForMeta = /* GraphQL */ `
  query GetAudiencesForMeta($Database_id: ID!, $meta_table: String!) {
    getAudiencesForMeta(Database_id: $Database_id, meta_table: $meta_table) {
      Audience_id
      Audience_name
    }
  }
`;
export const loadAudience = /* GraphQL */ `
  query LoadAudience($Audience_id: ID!) {
    loadAudience(Audience_id: $Audience_id)
  }
`;
export const getChartData = /* GraphQL */ `
  query GetChartData($Model_id: ID!, $Audience: getChartDataAudience!) {
    getChartData(Model_id: $Model_id, Audience: $Audience) {
      value
      count
    }
  }
`;
export const getReports = /* GraphQL */ `
  query GetReports($Client_code: String!, $Model_id: ID, $meta_table: String) {
    getReports(
      Client_code: $Client_code
      Model_id: $Model_id
      meta_table: $meta_table
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
export const paddingtonGetClients = /* GraphQL */ `
  query PaddingtonGetClients {
    paddingtonGetClients {
      ClientCode
      ClientCountry
    }
  }
`;
