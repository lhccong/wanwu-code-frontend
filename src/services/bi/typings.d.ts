declare namespace API {
  type addUsingGETParams = {
    /** name */
    name?: string;
  };

  type BaseResponseBiDiseaseResponse_ = {
    code?: number;
    data?: BiDiseaseResponse;
    message?: string;
  };

  type BaseResponseBiResponse_ = {
    code?: number;
    data?: BiResponse;
    message?: string;
  };

  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseChart_ = {
    code?: number;
    data?: Chart;
    message?: string;
  };

  type BaseResponseDisease_ = {
    code?: number;
    data?: Disease;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponsePageChart_ = {
    code?: number;
    data?: PageChart_;
    message?: string;
  };

  type BaseResponsePageDisease_ = {
    code?: number;
    data?: PageDisease_;
    message?: string;
  };

  type BiDiseaseResponse = {
    genResult?: string;
    name?: string;
  };

  type BiResponse = {
    chartId?: number;
    genChart?: string;
    genResult?: string;
  };

  type Chart = {
    chartData?: string;
    chartType?: string;
    createTime?: string;
    execMessage?: string;
    genChart?: string;
    genResult?: string;
    goal?: string;
    id?: number;
    isDelete?: number;
    name?: string;
    status?: string;
    updateTime?: string;
    userId?: number;
  };

  type ChartAddRequest = {
    chartData?: string;
    chartType?: string;
    goal?: string;
    name?: string;
  };

  type ChartEditRequest = {
    chartData?: string;
    chartType?: string;
    goal?: string;
    id?: number;
    name?: string;
  };

  type ChartQueryRequest = {
    chartType?: string;
    current?: number;
    goal?: string;
    id?: number;
    name?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type ChartUpdateRequest = {
    chartData?: string;
    chartType?: string;
    goal?: string;
    id?: number;
    name?: string;
  };

  type DeleteRequest = {
    id?: number;
  };

  type Disease = {
    createTime?: string;
    diseaseType?: string;
    genResult?: string;
    id?: number;
    isDelete?: number;
    name?: string;
    sex?: number;
    updateTime?: string;
    userDesc?: string;
    userId?: number;
  };

  type DiseaseAddRequest = {
    diseaseType?: string;
    sex?: number;
    userDesc?: string;
  };

  type DiseaseEditRequest = {
    diseaseType?: string;
    genResult?: string;
    id?: number;
    name?: string;
    sex?: number;
    userDesc?: string;
  };

  type DiseaseQueryRequest = {
    current?: number;
    diseaseType?: string;
    id?: number;
    name?: string;
    pageSize?: number;
    sex?: number;
    sortField?: string;
    sortOrder?: string;
    userDesc?: string;
    userId?: number;
  };

  type DiseaseUpdateRequest = {
    diseaseType?: string;
    genResult?: string;
    id?: number;
    name?: string;
    sex?: number;
    userDesc?: string;
  };

  type genChartByAiAsyncMqUsingPOSTParams = {
    chartType?: string;
    goal?: string;
    name?: string;
  };

  type genChartByAiAsyncUsingPOSTParams = {
    chartType?: string;
    goal?: string;
    name?: string;
  };

  type genChartByAiUsingPOSTParams = {
    chartType?: string;
    goal?: string;
    name?: string;
  };

  type genDiseaseByAiUsingPOSTParams = {
    diseaseType?: string;
    sex?: number;
    userDesc?: string;
  };

  type getChartByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getDiseaseByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageChart_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Chart[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageDisease_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Disease[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };
}
