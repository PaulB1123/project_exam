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
  data?: saveAudienceData | null,
  error?: ErrorType | null,
  StatusCode: number,
};

export type saveAudienceData = {
  __typename: "saveAudienceData",
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

export type saveReportAudienceInput = {
  chart_type: string,
  variable_type: string,
  selector?: string | null,
  id: string,
  position: number,
};

export type saveReportResponse = {
  __typename: "saveReportResponse",
  data?: ReportItem | null,
  error?: ErrorType | null,
  StatusCode: number,
};

export type ReportItem = {
  __typename: "ReportItem",
  Report_id?: string | null,
  Report_name?: string | null,
  meta_table?: string | null,
  createdBy?: string | null,
  createdAt?: string | null,
  Audiences?:  Array<ReportAudience | null > | null,
};

export type ReportAudience = {
  __typename: "ReportAudience",
  chart_type?: string | null,
  variable_type?: string | null,
  selector?: string | null,
  id?: string | null,
  position?: number | null,
};

export type updateReportInput = {
  Report_name?: string | null,
  Audiences?: Array< saveReportAudienceInput > | null,
};

export type updateReportResponse = {
  __typename: "updateReportResponse",
  data?: ReportItem | null,
  error?: ErrorType | null,
  StatusCode: number,
};

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
  variable_type: string,
  id: string,
  selector: string,
  category?: string | null,
  values?:  Array<selectorValue > | null,
};

export type selectorValue = {
  __typename: "selectorValue",
  id: number,
  value: string,
};

export type SelectorNumeric = {
  __typename: "SelectorNumeric",
  variable_type: string,
  id: string,
  selector: string,
  category?: string | null,
  max?: number | null,
  min?: number | null,
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
  createdAt?: string | null,
  createdBy?: string | null,
  editedBy?: string | null,
  editedAt?: string | null,
};

export type getChartDataAudience = {
  variable_type: string,
  selector: string,
  filters: getChartDataFilters,
};

export type getChartDataFilters = {
  categorical?: Array< categoricalInput > | null,
  numerical?: Array< numericalInput > | null,
};

export type categoricalInput = {
  id: string,
  values: Array< number >,
};

export type numericalInput = {
  id: string,
  min: number,
  max: number,
};

export type getChartDataResponse = {
  __typename: "getChartDataResponse",
  data?:  Array<ChartItem > | null,
  error?: ErrorType | null,
  StatusCode: number,
};

export type ChartItem = {
  __typename: "ChartItem",
  value: string,
  count: number,
};

export type getReportsResponse = {
  __typename: "getReportsResponse",
  Report_id?: string | null,
  Report_name?: string | null,
  meta_table?: string | null,
  createdBy?: string | null,
  createdAt?: string | null,
  Audiences?:  Array<ReportAudience | null > | null,
};

export type paddingtonGetClientsResponse = {
  __typename: "paddingtonGetClientsResponse",
  data?:  Array<ClientItem | null > | null,
  error?: ErrorType | null,
  StatusCode: number,
};

export type utilGetClusterResponse = {
  __typename: "utilGetClusterResponse",
  PK: string,
  Cluster_name: string,
};

export type utilGetDatabaseResponse = {
  __typename: "utilGetDatabaseResponse",
  PK?: string | null,
  Cluster_id?: string | null,
  Database_name?: string | null,
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
  Model_id: string,
  Audience_name: string,
};

export type SaveAudienceMutation = {
  saveAudience:  {
    __typename: "saveAudienceResponse",
    data?:  {
      __typename: "saveAudienceData",
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
  Audience_id: string,
};

export type UpdateAudienceMutation = {
  updateAudience:  {
    __typename: "saveAudienceResponse",
    data?:  {
      __typename: "saveAudienceData",
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

export type SaveReportMutationVariables = {
  Model_id: string,
  Report_name: string,
  Audiences: Array< saveReportAudienceInput >,
};

export type SaveReportMutation = {
  saveReport:  {
    __typename: "saveReportResponse",
    data?:  {
      __typename: "ReportItem",
      Report_id?: string | null,
      Report_name?: string | null,
      meta_table?: string | null,
      createdBy?: string | null,
      createdAt?: string | null,
      Audiences?:  Array< {
        __typename: "ReportAudience",
        chart_type?: string | null,
        variable_type?: string | null,
        selector?: string | null,
        id?: string | null,
        position?: number | null,
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

export type UpdateReportMutationVariables = {
  Report_id: string,
  Report: updateReportInput,
};

export type UpdateReportMutation = {
  updateReport:  {
    __typename: "updateReportResponse",
    data?:  {
      __typename: "ReportItem",
      Report_id?: string | null,
      Report_name?: string | null,
      meta_table?: string | null,
      createdBy?: string | null,
      createdAt?: string | null,
      Audiences?:  Array< {
        __typename: "ReportAudience",
        chart_type?: string | null,
        variable_type?: string | null,
        selector?: string | null,
        id?: string | null,
        position?: number | null,
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

export type DeleteReportMutationVariables = {
  Report_id: string,
};

export type DeleteReportMutation = {
  deleteReport:  {
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
  Database_id?: string | null,
  Model_id?: string | null,
  Model_name?: string | null,
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
  Model_id: string,
};

export type GetSelectorsForModelQuery = {
  getSelectorsForModel:  {
    __typename: "getSelectorsForModelResponse",
    data:  Array<( {
        __typename: "SelectorFactor",
        variable_type: string,
        id: string,
        selector: string,
        category?: string | null,
        values?:  Array< {
          __typename: string,
          id: number,
          value: string,
        } > | null,
      } | {
        __typename: "SelectorNumeric",
        variable_type: string,
        id: string,
        selector: string,
        category?: string | null,
        max?: number | null,
        min?: number | null,
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
      createdAt?: string | null,
      createdBy?: string | null,
      editedBy?: string | null,
      editedAt?: string | null,
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
  Audience_id: string,
};

export type LoadAudienceQuery = {
  loadAudience: string,
};

export type GetChartDataQueryVariables = {
  Model_id: string,
  Audience: getChartDataAudience,
};

export type GetChartDataQuery = {
  getChartData:  {
    __typename: "getChartDataResponse",
    data?:  Array< {
      __typename: "ChartItem",
      value: string,
      count: number,
    } > | null,
    error?:  {
      __typename: "ErrorType",
      type: string,
      message: string,
    } | null,
    StatusCode: number,
  },
};

export type GetReportsQueryVariables = {
  Model_id: string,
  all?: boolean | null,
};

export type GetReportsQuery = {
  getReports?:  Array< {
    __typename: "getReportsResponse",
    Report_id?: string | null,
    Report_name?: string | null,
    meta_table?: string | null,
    createdBy?: string | null,
    createdAt?: string | null,
    Audiences?:  Array< {
      __typename: "ReportAudience",
      chart_type?: string | null,
      variable_type?: string | null,
      selector?: string | null,
      id?: string | null,
      position?: number | null,
    } | null > | null,
  } > | null,
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

export type UtilGetClusterQueryVariables = {
  Cluster_id: string,
};

export type UtilGetClusterQuery = {
  utilGetCluster:  {
    __typename: "utilGetClusterResponse",
    PK: string,
    Cluster_name: string,
  },
};

export type UtilGetDatabaseQueryVariables = {
  Database_id?: string | null,
};

export type UtilGetDatabaseQuery = {
  utilGetDatabase:  {
    __typename: "utilGetDatabaseResponse",
    PK?: string | null,
    Cluster_id?: string | null,
    Database_name?: string | null,
  },
};
