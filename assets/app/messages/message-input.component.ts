import { Component, OnInit} from "@angular/core";
import { NgForm } from "@angular/forms";

import { MessageService } from "./message.service";
import { Message } from "./message.model";

@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html'
})
export class MessageInputComponent implements OnInit {
    // v  represents message loaded into the input field (edit event)
    //undefined by default since it should be empty unless edit event
    message: Message;

    constructor(private messageService: MessageService) {}

    onSubmit(form: NgForm) {
        //checks if this message is null or undefined
        //to see if edit or not
        if (this.message) {
          //editing
          this.message.content = form.value.content;
          this.messageService.updateMessage(this.message)
            .subscribe(
              result => console.log(result)
            );
          //returns the object back to the original null
          this.message = null;

        } else {
          //creating
          const message = new Message(form.value.content, 'Max');
          this.messageService.addMessage(message)
          .subscribe(
            data => console.log(data),
            error => console.error(error)
          );
        }
        form.resetForm();
    }

    onClear(form: NgForm) {
      //setting this back allows it to be loaded after being cleared multiple times
      this.message = null;
      form.resetForm();
    }

    ngOnInit() {
      //  v   subscribe to any event that may be emitted
      // informs this component gets informed when the edit button is clicked
      // and tells what to do which is
      //if message of type Message is received then make this.message = to that
      this.messageService.messageIsEdited.subscribe(
        (message: Message) => this.message = message
      );
    }
}
