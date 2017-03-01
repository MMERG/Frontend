import {Component, OnInit} from '@angular/core';
import {FormService} from "./form.service";
import { Payment } from './payment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  categories: any;
  error: any;
  customers: any;
  showDialog = false;
  showDialog3 = false;
  // ifAlone = true;

  //Calculator
  loanValue: number = 500;
  incomeValue: number = 245;
  deptorsValue: number = 245;
  period: number = 6;
  loanContractFee = 35;


  annualRate: number = 0.16;

  ifalone: boolean = true;
  list: Payment[];
  // /Calculator

  // isValid = false;
  // interestAndRepaymentPerMonth =0;
  // result1 = 0;
  // loan1 = 0;
  // interestRatePerYear = 0;
  // loanTermMonth = 0;
  // loanBalanceMonth = 0;
  // loanRepaymentPerMonth = 0;
  // loanInterestPerMonth = 0;



  constructor(private formService: FormService) {
  }


  addUser(firstName: string,
          lastName: string,
          phoneNumber1: number,
          phoneNumber2: number,
          personalCode: number,
          docType: string,
          docNumber: number,
          country: string,
          city: string,
          address: string,
          monthlySalary: number,
          email: string,
          loanAmount: number,
          loanTerm: number,
          loanInterestPayDay: number): void {
    firstName = firstName.trim();
    lastName = lastName.trim();
    phoneNumber1 = phoneNumber1.valueOf();
    phoneNumber2 = phoneNumber2.valueOf();
    personalCode = personalCode.valueOf();
    docType = docType.trim();
    docNumber = docNumber.valueOf();
    country = country.trim();
    city = city.trim();
    address = address.trim();
    monthlySalary = monthlySalary.valueOf();
    email = email.trim();
    loanAmount = loanAmount.valueOf();
    loanTerm = loanTerm.valueOf();
    loanInterestPayDay = loanInterestPayDay.valueOf();
    if (!firstName) {
      return;
    }
    this.formService.createCustomer(
      firstName,
      lastName,
      phoneNumber1,
      phoneNumber2,
      personalCode,
      docType,
      docNumber,
      country,
      city,
      address,
      monthlySalary,
      email,
      loanAmount,
      loanTerm,
      loanInterestPayDay)
      .then(customer => {
        this.customers.push(customer)
      })
  }


  addDraft(firstName: string,
           lastName: string,
           phoneNumber1: number,
           phoneNumber2: number,
           personalCode: number,
           docType: string,
           docNumber: number,
           country: string,
           city: string,
           address: string,
           monthlySalary: number,
           email: string,
           loanAmount: number,
           loanTerm: number,
           loanInterestPayDay: number): void {
    firstName = firstName.trim();
    lastName = lastName.trim();
    phoneNumber1 = phoneNumber1.valueOf();
    phoneNumber2 = phoneNumber2.valueOf();
    personalCode = personalCode.valueOf();
    docType = docType.trim();
    docNumber = docNumber.valueOf();
    country = country.trim();
    city = city.trim();
    address = address.trim();
    monthlySalary = monthlySalary.valueOf();
    email = email.trim();
    loanAmount = loanAmount.valueOf();
    loanTerm = loanTerm.valueOf();
    loanInterestPayDay = loanInterestPayDay.valueOf();
    if (!firstName) {
      return;
    }
    this.formService.createCustomerDraft(
      firstName,
      lastName,
      phoneNumber1,
      phoneNumber2,
      personalCode,
      docType,
      docNumber,
      country,
      city,
      address,
      monthlySalary,
      email,
      loanAmount,
      loanTerm,
      loanInterestPayDay)
      .then(customerDraft => {
        this.customers.push(customerDraft)
      })
  }


  ngOnInit(): void {
    this.getCustomers();
    console.log('onInit');
  }



  getCustomers() {
    this.formService.getCustomers()
      .then(customers => {
        this.customers = customers;
        console.log('success');
      }).catch(error => {
      this.error = error;
      console.log('error');
    })
  }

  showValue(loanValue: number, period: number) {


    this.list = [];

    let r = this.annualRate / 12;
    let monthlyPayment = 0;
    let monthlyInterest = 0;
    let leftValue = this.loanValue;

    monthlyPayment = this.calculateMonthlyPayment(loanValue, this.period);
    for (let i: number = 1; i <= this.period; i++)

    {


      monthlyInterest = this.calculateMonthlyInterest(leftValue);

      this.list.push(new Payment(i, leftValue, monthlyPayment, monthlyInterest, 0.70));
      leftValue = leftValue - (monthlyPayment - monthlyInterest);


    }
    console.log(this.list);
    //return this.list;
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

    return ((lvalue * (this.annualRate/12))/(1-((1+(this.annualRate/12))**(-1*period))));

  }

  calculateMonthlyInterest(lvalue: number)
  {
    return lvalue * this.annualRate/12;
  }

  ifIncomeToLow (income1:number, income2:number){
    console.log(income1+income2);

    if (income1+income2>666){
      this.showDialog = true;
      console.log(income1+income2);
    }
    else {
      this.showDialog3 = !this.showDialog3;
    }
  }
  // count(income1:number, loan1: number) {
  //   this.interestRatePerYear = 0.16;
  //   this.loanTermMonth = 5*12;
  //
  //
  //   this.isValid = true;
  //
  //   this.interestAndRepaymentPerMonth=((loan1*(this.interestRatePerYear/12))/(1-((1+(this.interestRatePerYear/12))**(-1*this.loanTermMonth))));
  //
  //   this.loanBalanceMonth = this.loan1-this.interestAndRepaymentPerMonth;
  //   this.loanRepaymentPerMonth = this.interestAndRepaymentPerMonth-(loan1*this.interestRatePerYear/12);
  //   this.loanInterestPerMonth = loan1*this.interestRatePerYear/12;
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //   return this.loanRepaymentPerMonth, this.loanInterestPerMonth, this.interestAndRepaymentPerMonth;
  //
  // }

}
