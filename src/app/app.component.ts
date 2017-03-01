import {Component, OnInit} from '@angular/core';
import {FormService} from "./form.service";
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  categories: any;
  error: any;
  customers: any;
  customerCode:any;
  code:string;
  status:string;
  showDialog = false;
  showDialog2 = false;
  isValid = false;
  userCode: any="";
  result1 = 0;
  result2 = 0;

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
  ngOnInit(): void {
    this.getCustomers();
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
        this.customers.push(customerDraft)
      })
  }

  neededLoanCode : string;
  buttonClicked : string;
  getStatus(loan_code: string){
    this.neededLoanCode = loan_code;
    this.buttonClicked = "true";
    console.log(loan_code);
  }





  count(income: number, loan: number) {

    this.isValid = true;

    return income + loan;

  }

}
