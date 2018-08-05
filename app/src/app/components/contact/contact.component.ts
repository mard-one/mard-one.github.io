import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  formContact: FormGroup;
  hintMessage: string;
  domain = 'http://localhost:8080';

  constructor(private formBuilder: FormBuilder, private http: Http) {
    this.createForm();
  }
  createForm() {
    this.formContact = this.formBuilder.group({
      username: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z0-9.-_$@*!]{3,20}$')
        ])
      ],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
          Validators.email
        ])
      ],
      subject: '',
      message: ['', Validators.compose([Validators.required])]
    });
  }
  contactSubmitHandler(e) {
    if (
      this.formContact.controls.username.valid &&
      this.formContact.controls.email.valid &&
      this.formContact.controls.message.valid
    ) {
      this.showHitWithMessage('Please wait. Processing...', '#2DB46C');
      const formData = {
        username: this.formContact.controls.username.value,
        email: this.formContact.controls.email.value,
        subject: this.formContact.controls.subject.value,
        message: this.formContact.controls.message.value,
        source: (<HTMLInputElement>document.querySelector('.option_holder'))
          .value
      };
      const headers = new Headers({
        'Content-Type': 'application/json;charset=utf-8'
      });
      const options = new RequestOptions({ headers: headers });
      this.http
        .post(
          'http://localhost:8080/getintouch',
          JSON.stringify(formData),
          options
        )
        .map(res => res.json())
        .subscribe(data => {
          this.showHitWithMessage(data.message, '#2DB46C');
        });
    } else {
      this.showHitWithMessage('Please fill in all required fields properly', '#FE3636');
    }
  }
  onChangeTextarea(e) {
    if (!e.target.value) {
      // document.querySelector('.message_field').style.visibility = 'visible';
      e.target.classList.add('has_danger');
    } else {
      // document.querySelector('.message_field').style.visibility = 'hidden';
      e.target.classList.remove('has_danger');
    }
  }
  onChangeSelect(e) {
    e.target.style.color = 'white';
  }
  showHitWithMessage(message, color) {
    const hint = <HTMLInputElement>document.querySelector('.hint');
    this.hintMessage = message;
    hint.style.backgroundColor = color;
    hint.style.visibility = 'visible';
    setTimeout(function() {
      hint.style.visibility = 'hidden';
    }, 5000);
  }

  ngOnInit() {}
}
