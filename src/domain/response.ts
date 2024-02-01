import { IPageable } from "./entities/pageable";
import { IProduct } from "./entities/product";
import { IProductCategory } from "./entities/product-category";

export interface IProductResponse extends IPageable {
    content: IProduct[];
}