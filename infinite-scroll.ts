import {Directive, ElementRef, Input, OnInit} from 'angular2/core';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';
import {Page, PageRequest} from './page';

@Directive({
    selector: "[inifiniteScroll]",
    host : {
		'(window:scroll)' : 'onScroll()'
    }
})
export class InfiniteScroll<T> implements OnInit {
    @Input() pageObservable: Observable<Page<T>>;
    @Input() nextPageObserver: Observer<PageRequest>;
    @Input() pageContentObserver: Observer<Array<T>>;
    @Input() triggerOffset: number = 100;

    private _loading: boolean = false;
    private _dataStore: {
        currentPage: Page<T>
    } = { currentPage: null };

    constructor(private _elementRef : ElementRef) { }

	ngOnInit() {
		this.pageObservable.subscribe(page => {
            if (page.number > 0) {
				Array.prototype.splice.apply(this._dataStore.currentPage.content, (<Array<any>>[page.number * this._dataStore.currentPage.size, this._dataStore.currentPage.size]).concat(page.content));
				page.content = this._dataStore.currentPage.content;
            }

            this._dataStore.currentPage = page;
            this.pageContentObserver.next(this._dataStore.currentPage.content);
			this._loading = false;
        })
	}

    onScroll() {
		if (!this._loading && !this._dataStore.currentPage.last) {
			var jqElement : any = jQuery(this._elementRef.nativeElement);
			var jqScrollParent : any = jqElement.scrollParent();

	        if ((jqScrollParent.height() - this.triggerOffset) < (jqScrollParent.scrollTop() + jQuery(window).height())) {
				this._loading = true;
				var pageRequest = new PageRequest();
				pageRequest.pageNumber = this._dataStore.currentPage.number + 1;
				this.nextPageObserver.next(pageRequest);
	        }
		}
    }
}
