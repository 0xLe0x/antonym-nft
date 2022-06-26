import { reactive } from 'vue'

export default reactive({
  collectionSize: 0,
  totalSupply: 0,
  soldOut: false,
  collabListVerified: false,
  preSaleListVerified: false,
  publicSaleActive: false,
  preSaleActive: false,
  collabSaleActive: false,
  preSalePrice: 0,
  publicPrice: 0,
  preSaleLimit: 0,
  publicLimit: 0
})
