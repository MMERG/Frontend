import {Component, OnInit} from '@angular/core';
import {FormService} from "./form.service";
import {Md5} from 'ts-md5/dist/md5';
import {Payment} from "./payment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  categories: any;
  error: any;
  customers: any;
  customersDraft:any;
  customerCode:any;
  showDialog = false;
  showDialog2 = false;
  showDialog3 = false;
  isValid = false;
  userCode: any="";
  result1 = 0;
  result2 = 0;
  loanValue: number = 500;
  incomeValue: number = 245;
  deptorsValue: number = 245;
  period: number = 6;
  annualRate: number = 0.16;
  list: Payment[];
  ifalone: boolean = true;
  code:string;
  status:string;
  loanContractFee = 35;
  monthlyPayment: number = 0;
  legalPayment: number = 0;
  incomeBoth: number = 0;
  message:any="Tokio kodo nėra";


  constructor(private formService: FormService) {
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
  getCustomersDraft() {
    this.formService.getCustomersDrafts()
      .then(customersDraft => {
        this.customersDraft = customersDraft;
        console.log('success');
      }).catch(error => {
      this.error = error;
      console.log('error');
    })
  }
  ngOnInit(): void {
    this.getCustomers();
    this.getCustomersDraft();
    console.log('onInit');
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
    var code=Md5.hashStr(firstName+Math.random().toString());
    this.userCode=code;
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
      loanInterestPayDay,
    <string>code)
      .then(customer => {
        this.customers.push(customer);
        this.getCustomers();
      })
  }
  updateStatus(id : number, status: string) {
    //this.loans[55].status = "Laura";
    //var filteredGoal = _.where(this.loans, {id: id});
    id = id;
    status = status.trim();
    //if (!name){return;}
    this.formService.updateStatus(id, status).then(msg => {
      // this.loans.push(msg);
      this.getCustomers();
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
    var code=Md5.hashStr(firstName+Math.random().toString());
    this.userCode=code;
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
      loanInterestPayDay,
      <string>code)
      .then(customerDraft => {
        this.customers.push(customerDraft);
        this.getCustomersDraft();
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
    this.monthlyPayment = ((lvalue * (this.annualRate/12))/(1-((1+(this.annualRate/12))**(-1*period))));
    return this.monthlyPayment;

  }

  calculateMonthlyInterest(lvalue: number)
  {
    return lvalue * this.annualRate/12;
  }

  ifIncomeToLowAlone (income1:number){
    console.log(income1);
    this.legalPayment = income1*0.4;
    console.log(this.legalPayment);
    console.log(this.monthlyPayment);


    if (this.monthlyPayment<this.legalPayment){
      this.showDialog = !this.showDialog;

      console.log(this.showDialog);
    }


    else {

      this.showDialog3 = true;
      console.log(this.showDialog3);
    }

  }

  ifIncomeToLowCoDeptor (income1:number, income2:number){
    console.log(income1);
    this.incomeBoth = income1 + income2;
    this.legalPayment = (income1 + income2)*0.4;
    console.log(this.legalPayment);
    console.log(this.monthlyPayment);


    if (this.monthlyPayment<this.legalPayment && this.incomeBoth > 666){
      this.showDialog = !this.showDialog;

      console.log(this.showDialog);
    }


    else {

      this.showDialog3 = true;
      console.log(this.showDialog3);
    }

  }
  calculateLoanContractFee (loanValue:number){
    if(loanValue*0.015>35){
      this.loanContractFee=loanValue*0.015
    }

  }


  getCode(id:number){
    this.formService.getCode(id)
      .then(customerCode=>{
        this.customerCode=customerCode;
        console.log('success');
      }).catch(error=>{
        this.error = error;
        console.log('error');
    })
  }

  count(income: number, loan: number) {

    this.isValid = true;

    return income + loan;

  }

}
