export default {
  queryRouteList: '/routes',

  queryUserInfo: '/user',
  logoutUser: '/user/logout',
  loginUser: 'POST /userLogin',

  queryUser: '/user/:id',
  queryUserList: '/users',
  updateUser: 'Patch /user/:id',
  createUser: 'POST /user',
  removeUser: 'DELETE /user/:id',
  removeUserList: 'POST /users/delete',

  queryPostList: '/posts',

  queryDashboard: '/dashboard',

  servicesList: 'GET /getAllServicesAdmin',
  createServices: 'POST /postNewService',
  updateServices: 'PUT /updateService',
  deleteService: 'DELETE /deleteService/:id',

  departmentsList: 'GET /getAllDepartments',
  createDepartment: 'POST /postNewDepartment',
  updateDepartment: 'PUT /updateDepartment',
  deleteDepartment: 'DELETE /deleteDepartment/:id',

  categoriesList: 'GET /getAllCategories',
  createCategory: 'POST /postNewCategory',
  updateCategory: 'PUT /updateCategory',
  deleteCategory: 'DELETE /deleteCategory/:id',

  subCategoriesList: 'GET /getAllSubCategories',
  createSubCategory: 'POST /postNewSubCategory',
  updateSubCategory: 'PUT /updateSubCategory',
  deleteSubCategory: 'DELETE /deleteSubCategory/:id',

  partsList: 'GET /getAllParts',
  createPart: 'POST /postNewPart',
  updatePart: 'PUT /updatePart',
  deletePart: 'DELETE /deletePart/:id',

  offersList: 'GET /getAllOffersAdmin',
  createOffer: 'POST /postNewOffer',
  updateOffer: 'PUT /updateOffer',
  deleteOffer: 'DELETE /deleteOffer/:id',

  packagesList: 'GET /getAllPackagesAdmin',
  createPackage: 'POST /postNewPackage',
  updatePackage: 'PUT /updatePackage',
  deletePackage: 'DELETE /deletePackage/:id',

  promoList: 'GET /getAllPromoCodes',
  createPromoCode: 'POST /postNewPromoCode',
  updatePromoCode: 'PUT /updatePromoCode',
  deletePromoCode: 'DELETE /deletePromoCode/:id',

  ordersAdminList: 'POST /getOrdersAdmin',
  pindingOrdersList: 'POST /getPindingOrders',
  providersList: 'GET /getProviders',
  createProvider: 'POST /createNewProvider',
  invoicesList: 'POST /getInvoices',
  approveProvider: 'PUT /approveProvider',
  zoneList: 'GET /getAllZones',
  createZone: 'POST /postNewZone',
}
