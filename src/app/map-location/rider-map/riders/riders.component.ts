import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ConnectedRider } from '../../model/connected-rider';

@Component({
  selector: 'app-riders',
  templateUrl: './riders.component.html',
  styleUrls: ['./riders.component.css']
})
export class RidersComponent implements OnInit {

  @Input() riders:ConnectedRider[]; 
  @Output() onRiderAssign = new EventEmitter<ConnectedRider>();
  constructor() { }

  ngOnInit() {
  }
  
  onRiderClick(rider:ConnectedRider){
    this.onRiderAssign.emit(rider);
  }
}
