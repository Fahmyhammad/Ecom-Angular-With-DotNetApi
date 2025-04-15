export interface IProduct {
  id:number
    name: string
    description: string
    newPrice: number
    oldPrice: number
    photos: IPhoto[]
    categoryId: number
    categoryName: string
  }
  
  export interface IPhoto {
    imageName: string
    productId: number
  }
  