import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-number-card',
  templateUrl: './number-card.component.html',
  styleUrls: ['./number-card.component.css']
})
export class NumberCardComponent implements OnInit {

  @Input('totalConfirmed')
  totalConfirmed;
  @Input('totalActive')
  totalActive;
  @Input('totalRecoverd')
  totalRecoverd;
  @Input('totalDeath')
  totalDeath;

  constructor() { }

  ngOnInit(): void {
  }

}
