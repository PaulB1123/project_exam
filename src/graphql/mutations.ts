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
    $Client_code: String
    $Model_id: ID!
    $Audience_name: String!
  ) {
    saveAudience(
      Client_code: $Client_code
      Model_id: $Model_id
      Audience_name: $Audience_name
    ) {
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
  mutation UpdateAudienceName(
    $Client_code: String
    $Audience_id: ID!
    $Audience_name: String!
  ) {
    updateAudienceName(
      Client_code: $Client_code
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
  mutation UpdateAudience($Client_code: String, $Audience_id: ID!) {
    updateAudience(Client_code: $Client_code, Audience_id: $Audience_id) {
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
  mutation DeleteAudience($Client_code: String, $Audience_id: ID!) {
    deleteAudience(Client_code: $Client_code, Audience_id: $Audience_id) {
      data
      error {
        type
        message
      }
      StatusCode
    }
  }
`;
export const saveDashboard = /* GraphQL */ `
  mutation SaveDashboard(
    $Client_code: String
    $Model_id: ID!
    $Dashboard_name: String!
    $Charts: [saveDashboardChartInput!]!
  ) {
    saveDashboard(
      Client_code: $Client_code
      Model_id: $Model_id
      Dashboard_name: $Dashboard_name
      Charts: $Charts
    ) {
      data {
        Dashboard_id
        Dashboard_name
        Is_default
        meta_table
        Created_by
        Created_at
        Charts {
          Chart_type
          Variable_type
          Title
          Variable
          Chart_size
          Position
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
export const updateDashboard = /* GraphQL */ `
  mutation UpdateDashboard(
    $Client_code: String
    $Dashboard_id: ID!
    $Dashboard: updateDashboardInput!
  ) {
    updateDashboard(
      Client_code: $Client_code
      Dashboard_id: $Dashboard_id
      Dashboard: $Dashboard
    ) {
      data {
        Dashboard_id
        Dashboard_name
        Is_default
        meta_table
        Created_by
        Created_at
        Charts {
          Chart_type
          Variable_type
          Title
          Variable
          Chart_size
          Position
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
export const addDefaultDashboard = /* GraphQL */ `
  mutation AddDefaultDashboard($Dashboard_id: ID!) {
    addDefaultDashboard(Dashboard_id: $Dashboard_id) {
      data {
        PK
        Dashboard_id
      }
      error {
        type
        message
      }
      StatusCode
    }
  }
`;
export const deleteDashboard = /* GraphQL */ `
  mutation DeleteDashboard($Client_code: String, $Dashboard_id: ID!) {
    deleteDashboard(Client_code: $Client_code, Dashboard_id: $Dashboard_id) {
      data
      error {
        type
        message
      }
      StatusCode
    }
  }
`;
export const addClientToGroup = /* GraphQL */ `
  mutation AddClientToGroup($Client_code: String!, $Client_country: String!) {
    addClientToGroup(
      Client_code: $Client_code
      Client_country: $Client_country
    ) {
      data {
        Message
        StatementId
        StatusCode
      }
      error {
        type
        message
      }
      StatusCode
    }
  }
`;
export const adminGrantAccess = /* GraphQL */ `
  mutation AdminGrantAccess(
    $Group: CRM_GROUP!
    $Client: adminClientInput!
    $Username: String!
  ) {
    adminGrantAccess(Group: $Group, Client: $Client, Username: $Username) {
      data {
        Resource
        Action
        Message
        StatementId
        StatusCode
      }
      error {
        Resource
        Action
        type
        message
        StatusCode
      }
      StatusCode
    }
  }
`;
export const adminRemoveAccess = /* GraphQL */ `
  mutation AdminRemoveAccess(
    $StatementType: StatementType
    $Client_code: String!
    $Client_country: String!
    $Username: String!
  ) {
    adminRemoveAccess(
      StatementType: $StatementType
      Client_code: $Client_code
      Client_country: $Client_country
      Username: $Username
    ) {
      data {
        Resource
        Action
        Message
        StatementId
        StatusCode
      }
      error {
        Resource
        Action
        type
        message
        StatusCode
      }
      StatusCode
    }
  }
`;
export const adminCreateInternalUser = /* GraphQL */ `
  mutation AdminCreateInternalUser(
    $Email: AWSEmail!
    $Group: CRM_GROUP!
    $Client: adminClientInput!
  ) {
    adminCreateInternalUser(Email: $Email, Group: $Group, Client: $Client) {
      data {
        Resource
        Action
        Message
        StatementId
        StatusCode
      }
      error {
        Resource
        Action
        type
        message
        StatusCode
      }
      StatusCode
    }
  }
`;
export const adminCreateExternalUser = /* GraphQL */ `
  mutation AdminCreateExternalUser(
    $Email: AWSEmail!
    $FamilyName: String!
    $Name: String!
    $Group: CRM_GROUP!
    $Client: adminClientInput!
  ) {
    adminCreateExternalUser(
      Email: $Email
      FamilyName: $FamilyName
      Name: $Name
      Group: $Group
      Client: $Client
    ) {
      data {
        Resource
        Action
        Message
        StatementId
        StatusCode
      }
      error {
        Resource
        Action
        type
        message
        StatusCode
      }
      StatusCode
    }
  }
`;
