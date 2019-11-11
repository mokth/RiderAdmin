import { Component, OnInit, Input } from '@angular/core';
import { AssignOrder } from '../../model/assign-order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
 
  @Input() orders:AssignOrder[];
 
  constructor() { }

  ngOnInit() {
  }

}
