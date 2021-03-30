import http from "api/http.js"
/**
 * post、get、put
 * http.post('url', params, 'query');
 * url:接口
 * params:参数
 * query:传参格式，默认为 data(body)传参，
 *      设置 query 为 params(query)传参，格式为：url?xx=xx
 * queryAndBody: 参数是否包含两个格式  query、body
 *    默认：false,
 *    如果设置为true
 *    参数形式如下，bodyObject内参数会在body传参，params 参数为 url?xxx=xxx
 *    params={
 *      xxx:xxx,
 *      bodyObject:String
 *    }
 */

// 系统用户登录 (获取 Jwt 授权数据)
export const userLogin = params => {
  return http.post("/connect/token", params)
}

// 获取租户列表 ========================================
export const getMultiTenancyTenants = params => {
  return http.get("/api/multi-tenancy/tenants", params, 'query')
}
// 所有租户数据
export const getMultiTenancyTenantsAll = params => {
  return http.get("/api/multi-tenancy/tenants/get-all", params, 'query')
}
// 详情
export const getMultiTenancyTenantInfo = params => {
  return http.get(`/api/multi-tenancy/tenants/${params.id}`, params, 'query')
}
// 增
export const postMultiTenancyTenants = params => {
  return http.post("/api/multi-tenancy/tenants", params)
}
// 改
export const putMultiTenancyTenants = params => {
  return http.put(`/api/multi-tenancy/tenants/${params.id}`, params)
}
// 删
export const deleteMultiTenancyTenants = params => {
  return http.delete(`/api/multi-tenancy/tenants/${params.id}`)
}

// Querier  =============================================
export const getQuerier = params => {
  return http.get("/api/querier", params, 'query')
}
// 获取租户绑定的 querier
export const getQuerierTenant = params => {
  return http.get(`/api/querier/get-list/${params.tenantId}`)
}
// 增
export const postQuerier = params => {
  return http.post("/api/querier", params)
}
// 修改
export const putQuerier = params => {
  return http.put("/api/querier", params)
}
// 删
export const deleteQuerier = params => {
  return http.delete(`/api/querier/${params.id}`, params)
}
// 详情
export const getQuerierInfo = params => {
  return http.get(`/api/querier/${params.id}`, params)
}

// data-query-provider ===============================================
export const getDataQueryProvider = params => {
  return http.get("/api/data-query-provider", params, 'query')
}
// 详情
export const getDataQueryProviderInfo = params => {
  return http.get(`/api/data-query-provider/${params.provider}`, params)
}

// data-query-provider  querier ================================================
export const getGatewayConfiguration = params => {
  return http.get("/api/gateway-configuration", params, 'query')
}
// 详情
export const getGatewayConfigurationInfo = params => {
  return http.get(`/api/gateway-configuration/current/${params.tenantId}`, params)
}
// 增
export const postGatewayConfiguration = params => {
  return http.post("/api/gateway-configuration", params, 'query', 'queryAndBody')
}
// 修改
export const putGatewayConfiguration = params => {
  return http.put("/api/gateway-configuration", params)
}

// map-tenant 租户编码映射 ================================================
export const getMapTenant = params => {
  return http.get("/api/map-tenant", params, 'query')
}
// 详情
export const getMapTenantById = params => {
  return http.get(`/api/map-tenant/${params.id}`, params)
}
export const getMapTenantByCode = params => {
  return http.get(`/api/map-tenant/get-by-code/${params.code}`, params)
}
// 增
export const postMapTenant = params => {
  return http.post("/api/map-tenant", params)
}
// 改
export const putMapTenant = params => {
  return http.put("/api/map-tenant", params)
}
// 删
export const deleteMapTenant = params => {
  return http.delete(`/api/map-tenant/${params.id}`, params)
}




