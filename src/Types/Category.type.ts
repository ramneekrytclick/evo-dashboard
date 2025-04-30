export interface Category {
	_id?: string;
	title: string;
	description?: string;
	photo?: string; // path to image like "category/icon.png"
	slug?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface Subcategory {
	_id?: string;
	title: string;
	description?: string;
	slug?: string;
	photo?: string; // path to image like "subcategory/icon.png"
	category: string; // category _id
	createdAt?: string;
	updatedAt?: string;
}
