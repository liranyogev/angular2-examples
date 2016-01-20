import {Component, Input, Output, EventEmitter} from 'angular2/core';

@Component({
	selector: 'confirm-modal',
	templateUrl: './confirm-modal.component.html'
})
export class ConfirmModalComponent {
	// Used to prevent duplicate dialogs
	@Input() id : string;
	// The dialog title
	@Input() title : string;
	@Output() ok : EventEmitter<any> = new EventEmitter();

	onOK() {
		this.ok.emit(null);
	}
}
