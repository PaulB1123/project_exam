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
      data {
        Client_name
        Client_code
        ClientCode
        ClientCountry
      }
      error {
        type
        message
      }
      StatusCode
    }
  }
`;
export const getModelsForClient = /* GraphQL */ `
  query GetModelsForClient($Client_code: String!) {
    getModelsForClient(Client_code: $Client_code) {
      data {
        Model_id
        Model_name
        Database_id
        meta_table
      }
      error {
        type
        message
      }
      StatusCode
    }
  }
`;
export const getSelectorsForModel = /* GraphQL */ `
  query GetSelectorsForModel($Model_id: ID!) {
    getSelectorsForModel(Model_id: $Model_id) {
      data {
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
      error {
        type
        message
      }
      StatusCode
    }
  }
`;
export const getAudiences = /* GraphQL */ `
  query GetAudiences($Model_id: ID!, $all: Boolean) {
    getAudiences(Model_id: $Model_id, all: $all) {
      data {
        Audience_id
        Audience_name
        createdAt
        createdBy
        editedBy
        editedAt
      }
      error {
        type
        message
      }
      StatusCode
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
      data {
        value
        count
      }
      error {
        type
        message
      }
      StatusCode
    }
  }
`;
export const getReports = /* GraphQL */ `
  query GetReports($Model_id: ID!, $all: Boolean) {
    getReports(Model_id: $Model_id, all: $all) {
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
      data {
        Client_name
        Client_code
        ClientCode
        ClientCountry
      }
      error {
        type
        message
      }
      StatusCode
    }
  }
`;
export const utilGetCluster = /* GraphQL */ `
  query UtilGetCluster($Cluster_id: ID!) {
    utilGetCluster(Cluster_id: $Cluster_id) {
      PK
      Cluster_name
    }
  }
`;
export const utilGetDatabase = /* GraphQL */ `
  query UtilGetDatabase($Database_id: ID) {
    utilGetDatabase(Database_id: $Database_id) {
      PK
      Cluster_id
      Database_name
    }
  }
`;
