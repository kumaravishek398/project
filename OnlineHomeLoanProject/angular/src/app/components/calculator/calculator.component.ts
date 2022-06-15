import { Component, OnInit } from '@angular/core';
declare const Calculate: any;

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
  constructor() {}

  onChange() {
    Calculate();
  }

  ngOnInit(): void {}
}
