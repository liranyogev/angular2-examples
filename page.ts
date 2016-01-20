export class Page<T> {
	content : Array<T>;
	last : boolean;
	size : number;
	number : number;
}

export class PageRequest {
	pageNumber : number;
	pageSize : number = null;
}
