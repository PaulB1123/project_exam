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
  query GetModel($Status: Status, $Database_id: ID!, $Model_name: String!) {
    getModel(
      Status: $Status
      Database_id: $Database_id
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
  query GetSelectorsForModel($Client_code: String, $Model_id: ID!) {
    getSelectorsForModel(Client_code: $Client_code, Model_id: $Model_id) {
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
  query GetAudiences($Client_code: String, $Model_id: ID!, $all: Boolean) {
    getAudiences(Client_code: $Client_code, Model_id: $Model_id, all: $all) {
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
  query LoadAudience($Client_code: String, $Audience_id: ID!) {
    loadAudience(Client_code: $Client_code, Audience_id: $Audience_id) {
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
export const getChartData = /* GraphQL */ `
  query GetChartData(
    $Client_code: String
    $Model_id: ID!
    $Audience: getChartDataAudience!
  ) {
    getChartData(
      Client_code: $Client_code
      Model_id: $Model_id
      Audience: $Audience
    ) {
      data {
        ... on ChartItem {
          value
          count
        }
        ... on ChartItemSingle {
          avg_value
          count_value
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
export const getReports = /* GraphQL */ `
  query GetReports($Client_code: String, $Model_id: ID!, $all: Boolean) {
    getReports(Client_code: $Client_code, Model_id: $Model_id, all: $all) {
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
export const isAuthorized = /* GraphQL */ `
  query IsAuthorized($Client_code: String, $Client_country: String) {
    isAuthorized(Client_code: $Client_code, Client_country: $Client_country) {
      data {
        UserIsAuthorized
      }
      error {
        type
        message
      }
      StatusCode
    }
  }
`;
export const adminGetAccessGroup = /* GraphQL */ `
  query AdminGetAccessGroup($Client: adminClientInput) {
    adminGetAccessGroup(Client: $Client) {
      data {
        Group
        Client_code
        Client_country
      }
      error {
        type
        message
      }
      StatusCode
    }
  }
`;
export const adminGetUsers = /* GraphQL */ `
  query AdminGetUsers(
    $Client_code: String!
    $Client_country: String!
    $Username: String
  ) {
    adminGetUsers(
      Client_code: $Client_code
      Client_country: $Client_country
      Username: $Username
    ) {
      data {
        Group
        Username
      }
      error {
        type
        message
      }
      StatusCode
    }
  }
`;
export const getGroupNames = /* GraphQL */ `
  query GetGroupNames {
    getGroupNames
  }
`;
