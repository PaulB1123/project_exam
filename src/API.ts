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
  Failed = "Failed",
  Deleted = "Deleted",
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

export type saveReportAudience = {
  chart_type: string,
  variable_type: string,
  selector?: string | null,
  id: string,
  position: number,
};

export type saveReportResponse = {
  __typename: "saveReportResponse",
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

export type updateReport = {
  Report_name?: string | null,
  Audiences?: Array< saveReportAudience > | null,
};

export type updateReportResponse = {
  __typename: "updateReportResponse",
  Report_id?: string | null,
  Report_name?: string | null,
  meta_table?: string | null,
  createdBy?: string | null,
  createdAt?: string | null,
  Audiences?:  Array<ReportAudience | null > | null,
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
  Client_name: string,
  Client_code: string,
};

export type getModelForClientResponse = {
  __typename: "getModelForClientResponse",
  Model_id: string,
  Model_name: string,
  Database_id: string,
  meta_table: string,
};

export type getSelectorForModelResponse = SelectorFactor | SelectorNumeric


export type SelectorFactor = {
  __typename: "SelectorFactor",
  variable_type?: string | null,
  id?: string | null,
  selector?: string | null,
  category?: string | null,
  values?:  Array<selectorValue | null > | null,
};

export type selectorValue = {
  __typename: "selectorValue",
  id?: number | null,
  value?: string | null,
};

export type SelectorNumeric = {
  __typename: "SelectorNumeric",
  variable_type?: string | null,
  id?: string | null,
  selector?: string | null,
  category?: string | null,
  max?: number | null,
  min?: number | null,
};

export type getAudiencesForMetaResponse = {
  __typename: "getAudiencesForMetaResponse",
  Audience_id: string,
  Audience_name: string,
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
  ClientCode?: string | null,
  ClientCountry?: string | null,
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
  Database_id: string,
  meta_table: string,
  Audience_name: string,
};

export type SaveAudienceMutation = {
  saveAudience: string,
};

export type SaveReportMutationVariables = {
  Client_code: string,
  Model_id: string,
  Report_name: string,
  Audiences: Array< saveReportAudience >,
};

export type SaveReportMutation = {
  saveReport:  {
    __typename: "saveReportResponse",
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
  },
};

export type UpdateReportMutationVariables = {
  Client_code: string,
  Report_id: string,
  Report: updateReport,
};

export type UpdateReportMutation = {
  updateReport:  {
    __typename: "updateReportResponse",
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
  },
};

export type DeleteReportMutationVariables = {
  Report_id: string,
};

export type DeleteReportMutation = {
  deleteReport: Operation,
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
  getClients?:  Array< {
    __typename: "getClientsResponse",
    Client_name: string,
    Client_code: string,
  } > | null,
};

export type GetModelsForClientQueryVariables = {
  Client_code: string,
};

export type GetModelsForClientQuery = {
  getModelsForClient?:  Array< {
    __typename: "getModelForClientResponse",
    Model_id: string,
    Model_name: string,
    Database_id: string,
    meta_table: string,
  } > | null,
};

export type GetSelectorsForModelQueryVariables = {
  Model_id: string,
};

export type GetSelectorsForModelQuery = {
  getSelectorsForModel:  Array<( {
      __typename: "SelectorFactor",
      variable_type?: string | null,
      id?: string | null,
      selector?: string | null,
      category?: string | null,
      values?:  Array< {
        __typename: string,
        id?: number | null,
        value?: string | null,
      } | null > | null,
    } | {
      __typename: "SelectorNumeric",
      variable_type?: string | null,
      id?: string | null,
      selector?: string | null,
      category?: string | null,
      max?: number | null,
      min?: number | null,
    }
  ) | null >,
};

export type GetAudiencesForMetaQueryVariables = {
  Database_id: string,
  meta_table: string,
};

export type GetAudiencesForMetaQuery = {
  getAudiencesForMeta?:  Array< {
    __typename: "getAudiencesForMetaResponse",
    Audience_id: string,
    Audience_name: string,
  } > | null,
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
  getChartData?:  Array< {
    __typename: "getChartDataResponse",
    value: string,
    count: number,
  } | null > | null,
};

export type GetReportsQueryVariables = {
  Client_code: string,
  Model_id?: string | null,
  meta_table?: string | null,
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
  paddingtonGetClients?:  Array< {
    __typename: "paddingtonGetClientsResponse",
    ClientCode?: string | null,
    ClientCountry?: string | null,
  } | null > | null,
};
