import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, scan, startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'hurrey';
  loader = true;
  Show = true;
  Show2 = false;
  Show3 = false;
  Show4 = false;
  hide = true;
  textControl = new FormControl();
  reactiveForm: FormGroup;
  statusClass = 'not-active';

  setActiveClass() {
    (this.statusClass = 'active'), '!active';
  }
  toggle1() {
    this.Show2 = !this.Show2;
    this.hide = false;
    this.Show = false;
  }
  toggle2() {
    this.Show3 = !this.Show3;
    this.Show2 = false;
    this.hide = false;
    this.Show = false;
  }
  toggle3() {
    this.Show4 = !this.Show4;
    this.Show3 = false;
    this.Show2 = false;
    this.hide = false;
    this.Show = false;
  }

  current = '';
  history$: Observable<string[]>;
  constructor(private builder: FormBuilder) {
    this.history$ = this.textControl.valueChanges.pipe(
      debounceTime(500),
      startWith(this.current),
      scan((acc, t) => (t ? acc.concat(t) : []), [])
    );
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.loader = false;
    }, 1000);
    this.reactiveForm = this.builder.group({
      username1: ['', Validators.required],
    });
  }
}
