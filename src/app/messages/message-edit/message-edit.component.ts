import { Component, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  standalone: false,
  templateUrl: './message-edit.component.html',
})
export class MessageEditComponent implements AfterViewInit {
  @ViewChild('subjectInput') subjectInput!: ElementRef;
  @ViewChild('msgTextInput') msgTextInput!: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  currentSender = 'Elijah Foard';  // Set a valid sender ID or retrieve it dynamically

  ngAfterViewInit() {
    // This ensures ViewChild references are initialized
    if (!this.subjectInput || !this.msgTextInput) {
      console.error('Input elements not found');
    }
  }

  onSendMessage() {
    if (this.subjectInput && this.msgTextInput) {
      const msg = new Message(
        '1',
        this.subjectInput.nativeElement.value,
        this.msgTextInput.nativeElement.value,
        this.currentSender
      );

      this.addMessageEvent.emit(msg);
      this.onClear();
    } else {
      console.error('Input elements not available');
    }
  }

  onClear() {
    if (this.subjectInput && this.msgTextInput) {
      this.subjectInput.nativeElement.value = '';
      this.msgTextInput.nativeElement.value = '';
    }
  }
}
