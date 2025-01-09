export interface Category {
    name:string;
    _id?:number;
}

export interface Subcategory {
    _id?:number;
    name: string;
    categoryId:number;
}