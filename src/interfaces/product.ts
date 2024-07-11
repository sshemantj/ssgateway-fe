export enum IProductsTypes {
  APPROVED = "aprovedProducts",
  UNAPPROVED = "unAprovedProducts",
}

export enum IApprovedPdTypes {
  MAPPED = "mappedProducts",
  UN_MAPPED = IProductsTypes.APPROVED,
}
export enum IApprovedPdTypesForStoreMap {
  MAPPED = "mappedProductsForStoreMap",
  UN_MAPPED = "unMappedProductsForStoreMap",
}
