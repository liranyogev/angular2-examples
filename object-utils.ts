export function isEmpty(obj : any) : boolean {
   if (typeof obj == 'undefined' || obj === null || obj === '') return true;
   if (typeof obj == 'number' && isNaN(obj)) return true;
   if (obj instanceof Date && isNaN(Number(obj))) return true;
   if (typeof obj == 'object' && isEmptyObject(obj)) return true;
   return false;
}

function isEmptyObject(obj : any) : boolean {
	var name;
	 for ( name in obj ) {
		 return false;
	 }
	 return true;
}
