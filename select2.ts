import {Directive, Input, ElementRef, AfterViewInit} from 'angular2/core';
import {Control, NgControlName} from 'angular2/common';
import {isEmpty} from './object-utils';

@Directive({
	selector: "[select2]"
})
export class Select2 implements AfterViewInit {
	@Input('select2') control : NgControlName;
	private _element : JQuery;

	constructor(private _elementRef : ElementRef) {
		this._element = jQuery(_elementRef.nativeElement);
	}

	ngAfterViewInit() {
		this._element.select2();
		var fnChange = function() {
			if (this.control.viewModel != this._element.val()) {
				this.control.viewToModelUpdate(this._element.val());
		 	}
		};

		this._element.on("change", fnChange.bind(this));
		this._element.val(this.control.viewModel).trigger("change");
	}
}
