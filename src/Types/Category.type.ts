export interface Category {
    name:string;
    _id?:string;
}

export interface Subcategory {
    _id?:string;
    name: string;
    categoryId:string;
}