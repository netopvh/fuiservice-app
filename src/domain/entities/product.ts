import { IProductCategory } from "./product-category";

export interface IProduct {
    id: number;
    description: string;
    info: string;
    price: number;
    stock: number;
    stockManagement: boolean;
    active: boolean;
    showcase: boolean;
    service: boolean;
    image: string;
    image2: string;
    image3: string;
    imagePanoramic: string;
    id_prod_cate: number;
    category: IProductCategory;
}