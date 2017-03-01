/**
 * Created by Marius on 2017.03.01.
 */
import { Component, OnInit}  from '@angular/core';
import { Payment } from './payment';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  loanValue: number = 500;
  incomeValue: number = 200;
  deptorsValue: number = 200;

  period: number = 5;
  annualRate: number = 0.16;

  ifalone: boolean = true;
  list: Payment[];


  constructor() { }

  ngOnInit() {
    console.log('onInit');


  }

   public showValue (loanValue: number) :void {

    this.list = [];

    let r = this.annualRate / 12;
    let monthlyPayment = 0;
    let monthlyInterest = 0;
    let leftValue = this.loanValue;

    for (let i: number = 1; i <= this.period; i++)

    {

      monthlyPayment = this.calculateMonthlyPayment(leftValue, this.period);
      monthlyInterest = this.calculateMonthlyInterest(leftValue);

      this.list.push(new Payment(i, leftValue, monthlyPayment, monthlyInterest, 0.70));
      leftValue = leftValue - (monthlyPayment + monthlyInterest + 0.70);


    }
    console.log(this.list);
    // return this.list;
  }

  changeMerriedStateToAlone()
  {
    this.ifalone = true;
  }

  changeMerriedStateToMerried()
  {
    this.ifalone = false;
  }

  calculateMonthlyPayment(lvalue: number, period: number)
  {
    return lvalue * (0.16/12) / (1 - Math.pow((1 + 0.16/12) , (period * -1)));
  }

  calculateMonthlyInterest(lvalue: number)
  {
    return lvalue * 0.16/12;
  }
}
