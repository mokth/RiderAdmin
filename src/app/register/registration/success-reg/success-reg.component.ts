import { Component, OnInit } from '@angular/core';
import { Register } from 'src/app/model';

@Component({
  selector: 'app-success-reg',
  templateUrl: './success-reg.component.html',
  styleUrls: ['./success-reg.component.css']
})
export class SuccessRegComponent implements OnInit {
  register :Register;
  constructor() {
    if (history.state.data!=null){
      this.register = history.state.data;
    }
   }

  ngOnInit() {
    
  }

}
