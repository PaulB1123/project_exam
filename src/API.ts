/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type addDatabase = {
  Cluster_name: string,
  Database_name: string,
};

export type addClient = {
  Client_code: string,
  Client_country: string,
};

export type AddDatabaseResponse = {
  __typename: "AddDatabaseResponse",
  Database_name: string,
  Cluster_name: string,
  Database_id: string,
  Cluster_id: string,
  Client: Client,
};

export type Client = {
  __typename: "Client",
  Client_code: string,
  Client_country: string,
  Client_name: string,
};

export enum Operation {
  Succeeded = "Succeeded",
  Success = "Success",
  Failed = "Failed",
  Deleted = "Deleted",
  Updated = "Updated",
}


export type updateDatabaseInput = {
  Database_name?: string | null,
};

export type updateDatabaseResponse = {
  __typename: "updateDatabaseResponse",
  Database_name?: string | null,
  Status?: string | null,
};

export type addModel = {
  Model_name: string,
  users_table: string,
  clusters_table: string,
  meta_table: string,
  unique_dim_table: string,
};

export type addModelResponse = {
  __typename: "addModelResponse",
  Model_id?: string | null,
  Model_name?: string | null,
  users_table?: string | null,
  clusters_table?: string | null,
  meta_table?: string | null,
  unique_dim_table?: string | null,
  Status?: string | null,
  Database_id?: string | null,
};

export type updateModel = {
  Model_name?: string | null,
  users_table?: string | null,
  clusters_table?: string | null,
  meta_table?: string | null,
  unique_dim_table?: string | null,
};

export type updateModelResponse = {
  __typename: "updateModelResponse",
  Model_id?: string | null,
  Model_name?: string | null,
  users_table?: string | null,
  clusters_table?: string | null,
  meta_table?: string | null,
  unique_dim_table?: string | null,
  Status?: string | null,
  Database_id?: string | null,
};

export type saveAudienceResponse = {
  __typename: "saveAudienceResponse",
  data?: AudienceDataItem | null,
  error?: ErrorType | null,
  StatusCode: number,
};

export type AudienceDataItem = {
  __typename: "AudienceDataItem",
  Url: string,
  Audience: AudienceItem,
};

export type AudienceItem = {
  __typename: "AudienceItem",
  Audience_name: string,
  Audience_id?: string | null,
};

export type ErrorType = {
  __typename: "ErrorType",
  type: string,
  message: string,
};

export type updateAudienceNameResponse = {
  __typename: "updateAudienceNameResponse",
  data?: AudienceItem | null,
  error?: ErrorType | null,
  StatusCode: number,
};

export type deleteResponse = {
  __typename: "deleteResponse",
  data?: string | null,
  error?: ErrorType | null,
  StatusCode: number,
};

export type saveDashboardChartInput = {
  Chart_type: string,
  Variable_type: string,
  Title?: string | null,
  Variable: string,
  Position: number,
  Chart_size?: ChartSize | null,
};

export enum ChartSize {
  small = "small",
  medium = "medium",
  large = "large",
}


export type saveDashboardResponse = {
  __typename: "saveDashboardResponse",
  data?: DashboardItem | null,
  error?: ErrorType | null,
  StatusCode: number,
};

export type DashboardItem = {
  __typename: "DashboardItem",
  Dashboard_id?: string | null,
  Dashboard_name?: string | null,
  Is_default?: boolean | null,
  meta_table?: string | null,
  Created_by?: string | null,
  Created_at?: string | null,
  Charts?:  Array<DashboardAudienceItem | null > | null,
};

export type DashboardAudienceItem = {
  __typename: "DashboardAudienceItem",
  Chart_type?: string | null,
  Variable_type?: string | null,
  Title?: string | null,
  Variable?: string | null,
  Chart_size?: ChartSize | null,
  Position?: number | null,
};

export type updateDashboardInput = {
  Dashboard_name?: string | null,
  Charts?: Array< saveDashboardChartInput > | null,
};

export type updateDashboardResponse = {
  __typename: "updateDashboardResponse",
  data?: DashboardItem | null,
  error?: ErrorType | null,
  StatusCode: number,
};

export type addDefaultDashboardResponse = {
  __typename: "addDefaultDashboardResponse",
  data?: DefaultDashboardItem | null,
  error?: ErrorType | null,
  StatusCode: number,
};

export type DefaultDashboardItem = {
  __typename: "DefaultDashboardItem",
  PK?: string | null,
  Dashboard_id?: string | null,
};

export type adminAddClientToGroupResponse = {
  __typename: "adminAddClientToGroupResponse",
  data?:  Array<adminAddClientToGroupData | null > | null,
  error?: ErrorType | null,
  StatusCode?: number | null,
};

export type adminAddClientToGroupData = {
  __typename: "adminAddClientToGroupData",
  Message: string,
  StatementId?: string | null,
  StatusCode?: number | null,
};

export enum CRM_GROUP {
  ADMIN = "ADMIN",
  RDS_ADMIN = "RDS_ADMIN",
  FULL = "FULL",
  ANALYST = "ANALYST",
  READ = "READ",
}


export type adminClientInput = {
  Client_code: string,
  Client_country: string,
};

export type adminPaddingtonResponse = {
  __typename: "adminPaddingtonResponse",
  data?:  Array<adminGrantData | null > | null,
  error?:  Array<AdminPaddingtonErrorResponse | null > | null,
  StatusCode: number,
};

export type adminGrantData = {
  __typename: "adminGrantData",
  Resource?: string | null,
  Action?: string | null,
  Message?: string | null,
  StatementId?: string | null,
  StatusCode?: number | null,
};

export type AdminPaddingtonErrorResponse = {
  __typename: "AdminPaddingtonErrorResponse",
  Resource?: string | null,
  Action?: string | null,
  type?: string | null,
  message?: string | null,
  StatusCode?: number | null,
};

export enum StatementType {
  Paddington = "Paddington",
  Access = "Access",
  Admin = "Admin",
}


export enum Status {
  Active = "Active",
  Deleted = "Deleted",
}


export type getDatabaseById = {
  Cluster_id?: string | null,
  Database_id?: string | null,
};

export type getDatabaseResponse = {
  __typename: "getDatabaseResponse",
  Cluster_id?: string | null,
  Databases?:  Array<getDatabaseItemResponse | null > | null,
};

export type getDatabaseItemResponse = {
  __typename: "getDatabaseItemResponse",
  Database_id?: string | null,
  Database_name?: string | null,
  Cluster_id?: string | null,
  Client_code?: string | null,
  Status?: string | null,
};

export type getDatabaseByName = {
  Cluster_name: string,
  Database_name?: string | null,
};

export type getClient = {
  Client_code: string,
  Client_country?: string | null,
};

export type getModelResponse = {
  __typename: "getModelResponse",
  Model_id?: string | null,
  Model_name?: string | null,
  meta_table?: string | null,
  users_table?: string | null,
  clusters_table?: string | null,
  unique_dim_table?: string | null,
  Client_code?: string | null,
  Database_id?: string | null,
  Status?: string | null,
};

export type getClientsResponse = {
  __typename: "getClientsResponse",
  data?:  Array<ClientItem > | null,
  error?: ErrorType | null,
  StatusCode: number,
};

export type ClientItem = {
  __typename: "ClientItem",
  Client_name: string,
  Client_code: string,
  ClientCode?: string | null,
  ClientCountry?: string | null,
};

export type getModelsForClientResponse = {
  __typename: "getModelsForClientResponse",
  data?:  Array<ModelItem > | null,
  error?: ErrorType | null,
  StatusCode: number,
};

export type ModelItem = {
  __typename: "ModelItem",
  Model_id: string,
  Model_name: string,
  Database_id: string,
  meta_table: string,
};

export type getSelectorsForModelResponse = {
  __typename: "getSelectorsForModelResponse",
  data?:  Array<getSelectorForModelUnion > | null,
  error?: ErrorType | null,
  StatusCode: number,
};

export type getSelectorForModelUnion = SelectorFactor | SelectorNumeric


export type SelectorFactor = {
  __typename: "SelectorFactor",
  Variable_type: string,
  Variable: string,
  Title: string,
  Category?: string | null,
  Values?:  Array<selectorValue > | null,
};

export type selectorValue = {
  __typename: "selectorValue",
  Id: number,
  Value: string,
};

export type SelectorNumeric = {
  __typename: "SelectorNumeric",
  Variable_type: string,
  Variable: string,
  Title: string,
  Category?: string | null,
  Max?: number | null,
  Min?: number | null,
};

export type getAudiencesResponse = {
  __typename: "getAudiencesResponse",
  data?:  Array<getAudienceItem | null > | null,
  error?: ErrorType | null,
  StatusCode: number,
};

export type getAudienceItem = {
  __typename: "getAudienceItem",
  Audience_id: string,
  Audience_name: string,
  Created_at?: string | null,
  Created_by?: string | null,
  Edited_by?: string | null,
  Edited_at?: string | null,
};

export type loadAudienceResponse = {
  __typename: "loadAudienceResponse",
  data?: AudienceDataItem | null,
  error?: ErrorType | null,
  StatusCode: number,
};

export type getChartDataAudience = {
  Numerical_variable?: string | null,
  Categorical_variable?: string | null,
  Filters: getChartDataFilters,
};

export type getChartDataFilters = {
  Categorical?: Array< categoricalInput > | null,
  Numerical?: Array< numericalInput > | null,
};

export type categoricalInput = {
  Variable: string,
  Values: Array< number >,
};

export type numericalInput = {
  Variable: string,
  Min: number,
  Max: number,
};

export type getChartDataResponse = {
  __typename: "getChartDataResponse",
  data?:  Array<chartDataItemUnion > | null,
  error?: ErrorType | null,
  StatusCode: number,
};

export type chartDataItemUnion = ChartItem | ChartItemSingle


export type ChartItem = {
  __typename: "ChartItem",
  Value: string,
  Count?: number | null,
  Avg_value?: number | null,
};

export type ChartItemSingle = {
  __typename: "ChartItemSingle",
  Avg_value?: number | null,
  Count_value?: number | null,
};

export type getDashboardsResponse = {
  __typename: "getDashboardsResponse",
  data?:  Array<DashboardItem > | null,
  error?: ErrorType | null,
  StatusCode: number,
};

export type paddingtonGetClientsResponse = {
  __typename: "paddingtonGetClientsResponse",
  data?:  Array<ClientItem | null > | null,
  error?: ErrorType | null,
  StatusCode: number,
};

export type isAuthorizedResponse = {
  __typename: "isAuthorizedResponse",
  data?: UserIsAuthorized | null,
  error?: ErrorType | null,
  StatusCode: number,
};

export type UserIsAuthorized = {
  __typename: "UserIsAuthorized",
  UserIsAuthorized: boolean,
};

export type adminGetAccessGroupResponse = {
  __typename: "adminGetAccessGroupResponse",
  data?:  Array<adminGetAccessGroupData | null > | null,
  error?: ErrorType | null,
  StatusCode: number,
};

export type adminGetAccessGroupData = {
  __typename: "adminGetAccessGroupData",
  Group?: string | null,
  Client_code: string,
  Client_country: string,
  Resources: adminGetAccessGroupResourceType,
};

export type adminGetAccessGroupResourceType = {
  __typename: "adminGetAccessGroupResourceType",
  Report: boolean,
  Audience: boolean,
  Activation: boolean,
  Admin: boolean,
};

export type adminGetUsersResponse = {
  __typename: "adminGetUsersResponse",
  data?:  Array<adminGetUsersData | null > | null,
  error?: ErrorType | null,
  StatusCode: number,
};

export type adminGetUsersData = {
  __typename: "adminGetUsersData",
  Group: string,
  Username: string,
};

export type SaveDatabaseMutationVariables = {
  Database: addDatabase,
  Client: addClient,
};

export type SaveDatabaseMutation = {
  saveDatabase:  {
    __typename: "AddDatabaseResponse",
    Database_name: string,
    Cluster_name: string,
    Database_id: string,
    Cluster_id: string,
    Client:  {
      __typename: "Client",
      Client_code: string,
      Client_country: string,
      Client_name: string,
    },
  },
};

export type DeleteDatabaseMutationVariables = {
  Cluster_id?: string | null,
  Database_id: string,
};

export type DeleteDatabaseMutation = {
  deleteDatabase: Operation,
};

export type UpdateDatabaseMutationVariables = {
  Database_id: string,
  Database: updateDatabaseInput,
};

export type UpdateDatabaseMutation = {
  updateDatabase:  {
    __typename: "updateDatabaseResponse",
    Database_name?: string | null,
    Status?: string | null,
  },
};

export type SaveModelMutationVariables = {
  Database_id?: string | null,
  Model: addModel,
};

export type SaveModelMutation = {
  saveModel:  {
    __typename: "addModelResponse",
    Model_id?: string | null,
    Model_name?: string | null,
    users_table?: string | null,
    clusters_table?: string | null,
    meta_table?: string | null,
    unique_dim_table?: string | null,
    Status?: string | null,
    Database_id?: string | null,
  },
};

export type DeleteModelMutationVariables = {
  Model_id: string,
};

export type DeleteModelMutation = {
  deleteModel: Operation,
};

export type UpdateModelMutationVariables = {
  Model_id: string,
  Model: updateModel,
};

export type UpdateModelMutation = {
  updateModel:  {
    __typename: "updateModelResponse",
    Model_id?: string | null,
    Model_name?: string | null,
    users_table?: string | null,
    clusters_table?: string | null,
    meta_table?: string | null,
    unique_dim_table?: string | null,
    Status?: string | null,
    Database_id?: string | null,
  },
};

export type SaveAudienceMutationVariables = {
  Client_code?: string | null,
  Model_id: string,
  Audience_name: string,
};

export type SaveAudienceMutation = {
  saveAudience:  {
    __typename: "saveAudienceResponse",
    data?:  {
      __typename: "AudienceDataItem",
      Url: string,
      Audience:  {
        __typename: "AudienceItem",
        Audience_name: string,
        Audience_id?: string | null,
      },
    } | null,
    error?:  {
      __typename: "ErrorType",
      type: string,
      message: string,
    } | null,
    StatusCode: number,
  },
};

export type UpdateAudienceNameMutationVariables = {
  Client_code?: string | null,
  Audience_id: string,
  Audience_name: string,
};

export type UpdateAudienceNameMutation = {
  updateAudienceName:  {
    __typename: "updateAudienceNameResponse",
    data?:  {
      __typename: "AudienceItem",
      Audience_name: string,
      Audience_id?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorType",
      type: string,
      message: string,
    } | null,
    StatusCode: number,
  },
};

export type UpdateAudienceMutationVariables = {
  Client_code?: string | null,
  Audience_id: string,
};

export type UpdateAudienceMutation = {
  updateAudience:  {
    __typename: "saveAudienceResponse",
    data?:  {
      __typename: "AudienceDataItem",
      Url: string,
      Audience:  {
        __typename: "AudienceItem",
        Audience_name: string,
        Audience_id?: string | null,
      },
    } | null,
    error?:  {
      __typename: "ErrorType",
      type: string,
      message: string,
    } | null,
    StatusCode: number,
  },
};

export type DeleteAudienceMutationVariables = {
  Client_code?: string | null,
  Audience_id: string,
};

export type DeleteAudienceMutation = {
  deleteAudience:  {
    __typename: "deleteResponse",
    data?: string | null,
    error?:  {
      __typename: "ErrorType",
      type: string,
      message: string,
    } | null,
    StatusCode: number,
  },
};

export type SaveDashboardMutationVariables = {
  Client_code?: string | null,
  Model_id: string,
  Dashboard_name: string,
  Charts: Array< saveDashboardChartInput >,
};

export type SaveDashboardMutation = {
  saveDashboard:  {
    __typename: "saveDashboardResponse",
    data?:  {
      __typename: "DashboardItem",
      Dashboard_id?: string | null,
      Dashboard_name?: string | null,
      Is_default?: boolean | null,
      meta_table?: string | null,
      Created_by?: string | null,
      Created_at?: string | null,
      Charts?:  Array< {
        __typename: "DashboardAudienceItem",
        Chart_type?: string | null,
        Variable_type?: string | null,
        Title?: string | null,
        Variable?: string | null,
        Chart_size?: ChartSize | null,
        Position?: number | null,
      } | null > | null,
    } | null,
    error?:  {
      __typename: "ErrorType",
      type: string,
      message: string,
    } | null,
    StatusCode: number,
  },
};

export type UpdateDashboardMutationVariables = {
  Client_code?: string | null,
  Dashboard_id: string,
  Dashboard: updateDashboardInput,
};

export type UpdateDashboardMutation = {
  updateDashboard:  {
    __typename: "updateDashboardResponse",
    data?:  {
      __typename: "DashboardItem",
      Dashboard_id?: string | null,
      Dashboard_name?: string | null,
      Is_default?: boolean | null,
      meta_table?: string | null,
      Created_by?: string | null,
      Created_at?: string | null,
      Charts?:  Array< {
        __typename: "DashboardAudienceItem",
        Chart_type?: string | null,
        Variable_type?: string | null,
        Title?: string | null,
        Variable?: string | null,
        Chart_size?: ChartSize | null,
        Position?: number | null,
      } | null > | null,
    } | null,
    error?:  {
      __typename: "ErrorType",
      type: string,
      message: string,
    } | null,
    StatusCode: number,
  },
};

export type AddDefaultDashboardMutationVariables = {
  Dashboard_id: string,
};

export type AddDefaultDashboardMutation = {
  addDefaultDashboard:  {
    __typename: "addDefaultDashboardResponse",
    data?:  {
      __typename: "DefaultDashboardItem",
      PK?: string | null,
      Dashboard_id?: string | null,
    } | null,
    error?:  {
      __typename: "ErrorType",
      type: string,
      message: string,
    } | null,
    StatusCode: number,
  },
};

export type DeleteDashboardMutationVariables = {
  Client_code?: string | null,
  Dashboard_id: string,
};

export type DeleteDashboardMutation = {
  deleteDashboard:  {
    __typename: "deleteResponse",
    data?: string | null,
    error?:  {
      __typename: "ErrorType",
      type: string,
      message: string,
    } | null,
    StatusCode: number,
  },
};

export type AddClientToGroupMutationVariables = {
  Client_code: string,
  Client_country: string,
};

export type AddClientToGroupMutation = {
  addClientToGroup:  {
    __typename: "adminAddClientToGroupResponse",
    data?:  Array< {
      __typename: "adminAddClientToGroupData",
      Message: string,
      StatementId?: string | null,
      StatusCode?: number | null,
    } | null > | null,
    error?:  {
      __typename: "ErrorType",
      type: string,
      message: string,
    } | null,
    StatusCode?: number | null,
  },
};

export type AdminGrantAccessMutationVariables = {
  Group: CRM_GROUP,
  Client: adminClientInput,
  Username: string,
};

export type AdminGrantAccessMutation = {
  adminGrantAccess:  {
    __typename: "adminPaddingtonResponse",
    data?:  Array< {
      __typename: "adminGrantData",
      Resource?: string | null,
      Action?: string | null,
      Message?: string | null,
      StatementId?: string | null,
      StatusCode?: number | null,
    } | null > | null,
    error?:  Array< {
      __typename: "AdminPaddingtonErrorResponse",
      Resource?: string | null,
      Action?: string | null,
      type?: string | null,
      message?: string | null,
      StatusCode?: number | null,
    } | null > | null,
    StatusCode: number,
  },
};

export type AdminRemoveAccessMutationVariables = {
  StatementType?: StatementType | null,
  Client_code: string,
  Client_country: string,
  Username: string,
};

export type AdminRemoveAccessMutation = {
  adminRemoveAccess:  {
    __typename: "adminPaddingtonResponse",
    data?:  Array< {
      __typename: "adminGrantData",
      Resource?: string | null,
      Action?: string | null,
      Message?: string | null,
      StatementId?: string | null,
      StatusCode?: number | null,
    } | null > | null,
    error?:  Array< {
      __typename: "AdminPaddingtonErrorResponse",
      Resource?: string | null,
      Action?: string | null,
      type?: string | null,
      message?: string | null,
      StatusCode?: number | null,
    } | null > | null,
    StatusCode: number,
  },
};

export type AdminCreateInternalUserMutationVariables = {
  Email: string,
  Group: CRM_GROUP,
  Client: adminClientInput,
};

export type AdminCreateInternalUserMutation = {
  adminCreateInternalUser:  {
    __typename: "adminPaddingtonResponse",
    data?:  Array< {
      __typename: "adminGrantData",
      Resource?: string | null,
      Action?: string | null,
      Message?: string | null,
      StatementId?: string | null,
      StatusCode?: number | null,
    } | null > | null,
    error?:  Array< {
      __typename: "AdminPaddingtonErrorResponse",
      Resource?: string | null,
      Action?: string | null,
      type?: string | null,
      message?: string | null,
      StatusCode?: number | null,
    } | null > | null,
    StatusCode: number,
  },
};

export type AdminCreateExternalUserMutationVariables = {
  Email: string,
  FamilyName: string,
  Name: string,
  Group: CRM_GROUP,
  Client: adminClientInput,
};

export type AdminCreateExternalUserMutation = {
  adminCreateExternalUser:  {
    __typename: "adminPaddingtonResponse",
    data?:  Array< {
      __typename: "adminGrantData",
      Resource?: string | null,
      Action?: string | null,
      Message?: string | null,
      StatementId?: string | null,
      StatusCode?: number | null,
    } | null > | null,
    error?:  Array< {
      __typename: "AdminPaddingtonErrorResponse",
      Resource?: string | null,
      Action?: string | null,
      type?: string | null,
      message?: string | null,
      StatusCode?: number | null,
    } | null > | null,
    StatusCode: number,
  },
};

export type GetDatabaseByIdQueryVariables = {
  Status?: Status | null,
  Database: getDatabaseById,
};

export type GetDatabaseByIdQuery = {
  getDatabaseById:  {
    __typename: "getDatabaseResponse",
    Cluster_id?: string | null,
    Databases?:  Array< {
      __typename: "getDatabaseItemResponse",
      Database_id?: string | null,
      Database_name?: string | null,
      Cluster_id?: string | null,
      Client_code?: string | null,
      Status?: string | null,
    } | null > | null,
  },
};

export type GetDatabaseByNameQueryVariables = {
  Status?: Status | null,
  Database: getDatabaseByName,
  Client?: getClient | null,
};

export type GetDatabaseByNameQuery = {
  getDatabaseByName:  {
    __typename: "getDatabaseResponse",
    Cluster_id?: string | null,
    Databases?:  Array< {
      __typename: "getDatabaseItemResponse",
      Database_id?: string | null,
      Database_name?: string | null,
      Cluster_id?: string | null,
      Client_code?: string | null,
      Status?: string | null,
    } | null > | null,
  },
};

export type GetModelQueryVariables = {
  Status?: Status | null,
  Database_id: string,
  Model_name: string,
};

export type GetModelQuery = {
  getModel?:  Array< {
    __typename: "getModelResponse",
    Model_id?: string | null,
    Model_name?: string | null,
    meta_table?: string | null,
    users_table?: string | null,
    clusters_table?: string | null,
    unique_dim_table?: string | null,
    Client_code?: string | null,
    Database_id?: string | null,
    Status?: string | null,
  } | null > | null,
};

export type GetClientsQuery = {
  getClients:  {
    __typename: "getClientsResponse",
    data?:  Array< {
      __typename: "ClientItem",
      Client_name: string,
      Client_code: string,
      ClientCode?: string | null,
      ClientCountry?: string | null,
    } > | null,
    error?:  {
      __typename: "ErrorType",
      type: string,
      message: string,
    } | null,
    StatusCode: number,
  },
};

export type GetModelsForClientQueryVariables = {
  Client_code: string,
};

export type GetModelsForClientQuery = {
  getModelsForClient:  {
    __typename: "getModelsForClientResponse",
    data?:  Array< {
      __typename: "ModelItem",
      Model_id: string,
      Model_name: string,
      Database_id: string,
      meta_table: string,
    } > | null,
    error?:  {
      __typename: "ErrorType",
      type: string,
      message: string,
    } | null,
    StatusCode: number,
  },
};

export type GetSelectorsForModelQueryVariables = {
  Client_code?: string | null,
  Model_id: string,
};

export type GetSelectorsForModelQuery = {
  getSelectorsForModel:  {
    __typename: "getSelectorsForModelResponse",
    data:  Array<( {
        __typename: "SelectorFactor",
        Variable_type: string,
        Variable: string,
        Title: string,
        Category?: string | null,
        Values?:  Array< {
          __typename: string,
          Id: number,
          Value: string,
        } > | null,
      } | {
        __typename: "SelectorNumeric",
        Variable_type: string,
        Variable: string,
        Title: string,
        Category?: string | null,
        Max?: number | null,
        Min?: number | null,
      }
    ) > | null,
    error?:  {
      __typename: "ErrorType",
      type: string,
      message: string,
    } | null,
    StatusCode: number,
  },
};

export type GetAudiencesQueryVariables = {
  Client_code?: string | null,
  Model_id: string,
  all?: boolean | null,
};

export type GetAudiencesQuery = {
  getAudiences:  {
    __typename: "getAudiencesResponse",
    data?:  Array< {
      __typename: "getAudienceItem",
      Audience_id: string,
      Audience_name: string,
      Created_at?: string | null,
      Created_by?: string | null,
      Edited_by?: string | null,
      Edited_at?: string | null,
    } | null > | null,
    error?:  {
      __typename: "ErrorType",
      type: string,
      message: string,
    } | null,
    StatusCode: number,
  },
};

export type LoadAudienceQueryVariables = {
  Client_code?: string | null,
  Audience_id: string,
};

export type LoadAudienceQuery = {
  loadAudience:  {
    __typename: "loadAudienceResponse",
    data?:  {
      __typename: "AudienceDataItem",
      Url: string,
      Audience:  {
        __typename: "AudienceItem",
        Audience_name: string,
        Audience_id?: string | null,
      },
    } | null,
    error?:  {
      __typename: "ErrorType",
      type: string,
      message: string,
    } | null,
    StatusCode: number,
  },
};

export type GetChartDataQueryVariables = {
  Client_code?: string | null,
  Model_id: string,
  Audience: getChartDataAudience,
};

export type GetChartDataQuery = {
  getChartData:  {
    __typename: "getChartDataResponse",
    data:  Array<( {
        __typename: "ChartItem",
        Value: string,
        Count?: number | null,
        Avg_value?: number | null,
      } | {
        __typename: "ChartItemSingle",
        Avg_value?: number | null,
        Count_value?: number | null,
      }
    ) > | null,
    error?:  {
      __typename: "ErrorType",
      type: string,
      message: string,
    } | null,
    StatusCode: number,
  },
};

export type GetDashboardsQueryVariables = {
  Client_code?: string | null,
  Model_id: string,
  all?: boolean | null,
};

export type GetDashboardsQuery = {
  getDashboards:  {
    __typename: "getDashboardsResponse",
    data?:  Array< {
      __typename: "DashboardItem",
      Dashboard_id?: string | null,
      Dashboard_name?: string | null,
      Is_default?: boolean | null,
      meta_table?: string | null,
      Created_by?: string | null,
      Created_at?: string | null,
      Charts?:  Array< {
        __typename: "DashboardAudienceItem",
        Chart_type?: string | null,
        Variable_type?: string | null,
        Title?: string | null,
        Variable?: string | null,
        Chart_size?: ChartSize | null,
        Position?: number | null,
      } | null > | null,
    } > | null,
    error?:  {
      __typename: "ErrorType",
      type: string,
      message: string,
    } | null,
    StatusCode: number,
  },
};

export type PaddingtonGetClientsQuery = {
  // to be deleted
  paddingtonGetClients?:  {
    __typename: "paddingtonGetClientsResponse",
    data?:  Array< {
      __typename: "ClientItem",
      Client_name: string,
      Client_code: string,
      ClientCode?: string | null,
      ClientCountry?: string | null,
    } | null > | null,
    error?:  {
      __typename: "ErrorType",
      type: string,
      message: string,
    } | null,
    StatusCode: number,
  } | null,
};

export type IsAuthorizedQueryVariables = {
  Client_code?: string | null,
  Client_country?: string | null,
};

export type IsAuthorizedQuery = {
  isAuthorized:  {
    __typename: "isAuthorizedResponse",
    data?:  {
      __typename: "UserIsAuthorized",
      UserIsAuthorized: boolean,
    } | null,
    error?:  {
      __typename: "ErrorType",
      type: string,
      message: string,
    } | null,
    StatusCode: number,
  },
};

export type AdminGetAccessGroupQueryVariables = {
  Client?: adminClientInput | null,
};

export type AdminGetAccessGroupQuery = {
  adminGetAccessGroup:  {
    __typename: "adminGetAccessGroupResponse",
    data?:  Array< {
      __typename: "adminGetAccessGroupData",
      Group?: string | null,
      Client_code: string,
      Client_country: string,
      Resources:  {
        __typename: "adminGetAccessGroupResourceType",
        Report: boolean,
        Audience: boolean,
        Activation: boolean,
        Admin: boolean,
      },
    } | null > | null,
    error?:  {
      __typename: "ErrorType",
      type: string,
      message: string,
    } | null,
    StatusCode: number,
  },
};

export type AdminGetUsersQueryVariables = {
  Client_code: string,
  Client_country: string,
  Username?: string | null,
};

export type AdminGetUsersQuery = {
  adminGetUsers:  {
    __typename: "adminGetUsersResponse",
    data?:  Array< {
      __typename: "adminGetUsersData",
      Group: string,
      Username: string,
    } | null > | null,
    error?:  {
      __typename: "ErrorType",
      type: string,
      message: string,
    } | null,
    StatusCode: number,
  },
};

export type GetGroupNamesQuery = {
  getGroupNames?: Array< string | null > | null,
};
