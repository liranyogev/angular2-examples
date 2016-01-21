# Angualar2 examples (ideas)

I experimented a bit with angular2 and I wanted to share a few ideas.

### Bootstrap Confirm modal
I created a very simple bootstrap confirm modal.
#### files
* confirm-modal.component.ts
* confirm-modal.component.html

#### usage
```html
<confirm-modal [id]="'confirm_remove_id'" [title]="'confirm_remove_title'" (ok)="removeStuff()">Some text</confirm-modal>
```
```typescript
...
import {ConfirmModalComponent} from '../modal/confirm-modal.component';
@Component({
    ...
    directives: [ConfirmModalComponent]
})
export class TestComponent {
    removeStuff() {
        ...
    }
}
})
```

### Enable select2 in an angular2 form
Add select2 to any angular2 form (currently only for static options non ajax select).

#### files
* select2.ts

#### requirements
* jQuery
* Select2

##### typings.json
```json
{
  "dependencies": {},
  "devDependencies": {},
  "ambientDependencies": {
    "jquery": "github:DefinitelyTyped/DefinitelyTyped/jquery/jquery.d.ts#b13a8c64ffd368b4528f222f404f67b4c7d76cfb",
    "select2": "github:DefinitelyTyped/DefinitelyTyped/select2/select2.d.ts#26d1679100e15788fe7e981c1b746f38b820509a"
  }
}
```



#### usage
```html
<form #some_form="ngForm" (ngSubmit)="onSubmit()">
    <select [select2]="some_select" #some_select="ngForm" [(ngModel)]="model.some_select" ngControl="some_select">
        <option *ngFor="#option of options" [value]="option">{{option}}</option>
    </select>
</form>
```
```typescript
...
import {Select2} from '../utils/select2';
import {NgForm} from 'angular2/common';
@Component({
    ...
	directives: [Select2]
})
export class TestComponent {
    @ViewChild('searchForm') searchForm: NgForm;
}
```

### Angular2 Infinite scroll
This is a very basic idea for an ifinite scroll. it's far from ready to be used anywhere since it's very abstract.
It assumes your web server returns a Page (I am using java with spring boot so my server returns: [org.springframework.data.domain.Page](http://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/domain/Page.html))

#### files
* infinite-scroll.ts
* page.ts
* jquery.scroll-parent.js

#### requirements
* jQuery

### usage
```html
<div inifiniteScroll [pageObservable]="pageObservable" [nextPageObserver]="nextPageObserver" [pageContentObserver]="pageContentObserver">
```
```typescript
...
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject, Subject} from 'rxjs/Rx';

export class TestComponent {
	private _page$ : Subject<Page<SomeClass>> = new ReplaySubject(1);
	private _nextPage$ : Subject<PageRequest> = new ReplaySubject(1);
	private _pageContent$ : Subject<Array<SomeClass>> = new ReplaySubject(1);

	content : Array<SomeClass>

	get pageObservable() : Observable<Page<Movie>> {
		return this._page$
	}

	get nextPageObserver() : Observer<PageRequest> {
		return this._nextPage$;
	}

	get pageContentObserver() : Observer<Array<Movie>> {
		return this._pageContent$;
	}

	constructor(private _http: Http) {
	    this._nextPage$.subscribe(pageRequest => {
	        this._http.get('some/content/page/' + pageRequest.pageNumber).map(response => response.json()).subscribe(data => {
	            this._page$.next(data);
	        });
	    }
	    this._pageContent$.subscribe(content => {
	        this.content = content;
	    }
	}
}
```

### Global Angular2 pipes
#### usage
Sometimes you may wish a pipe will be available globally without having to declare it on each @Component.

In your bootstrap file we extend the PLATFORM_PIPES to include our new pipe as well as the COMMON_PIPES which is what PLATFORM_PIPES had before.
```typescript
import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_BINDINGS} from 'angular2/http';
import {SomePipe} from './some.pipe';
import {Provider, PLATFORM_PIPES} from 'angular2/core';
import {COMMON_PIPES} from 'angular2/common';

bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_BINDINGS, new Provider(PLATFORM_PIPES, {useValue: [SomePipe,...COMMON_PIPES], multi: true})]);
```
