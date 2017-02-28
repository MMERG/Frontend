import {Component, OnInit} from '@angular/core';
import {FormService} from "./form.service";

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
  isValid = false;
  result1 = 0;
  result2 = 0;

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

  count(income: number, loan: number) {

    this.isValid = true;

    return income + loan;

  }

}
