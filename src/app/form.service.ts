import {Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";
import {toPromise} from "rxjs/operator/toPromise";
import 'rxjs/add/operator/toPromise';
import {Data} from "@angular/router";
import {AppComponent} from "./app.component"
import {Md5} from 'ts-md5/dist/md5';

@Injectable()
export class FormService  {
  private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: Http) {
  }

  getCustomers():Promise<any>{
    return this.http.get("https://loaning-api.herokuapp.com/customers")
      .toPromise()
      .then(response=>response.json())
      .catch(this.handleError);
  }
  getCustomersDrafts():Promise<any>{
    return this.http.get("https://loaning-api.herokuapp.com/customerDrafts")
      .toPromise()
      .then(response=>response.json())
      .catch(this.handleError);
  }
  getCode(id:number):Promise<any>{
    return this.http.get("https://loaning-api.herokuapp.com/customerCode/{id}")
      .toPromise()
      .then(response=>response.text())
      .catch(this.handleError);
  }

  createCustomer(firstName: string,
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
                 email:string,
                 loanAmount:number,
                 loanTerm:number,
                 loanInterestPayDay: number,
  code:string): Promise<any> {
    return this.http
      .post("https://loaning-api.herokuapp.com/customer/add", JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        phoneNumber1: phoneNumber1,
        phoneNumber2: phoneNumber2,
        personalCode: personalCode,
        docType: docType,
        docNumber: docNumber,
        country: country,
        city: city,
        address: address,
        monthlySalary: monthlySalary,
        email: email,
        loanAmount:loanAmount,
        loanTerm:loanTerm,
        loanInterestPayDay:loanInterestPayDay,
        code:code
      }), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  updateStatus(id: number, status: string): Promise<any> {
    return this.http
      .put("https://loaning-api.herokuapp.com/loanstatus/update", {id: id, status:status}, {headers: this.headers})
      .toPromise()
      .then(() => {
        // this.getLoans();
      });
    // .then(res => res.json().data)
    // .catch(this.handleError);
  }



  createCustomerDraft(firstName: string,
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
                 email:string,
                 loanAmount:number,
                 loanTerm:number,
                 loanInterestPayDay: number,
  code:string): Promise<any> {
    return this.http
      .post("https://loaning-api.herokuapp.com/customerDraft/add", JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        phoneNumber1: phoneNumber1,
        phoneNumber2: phoneNumber2,
        personalCode: personalCode,
        docType: docType,
        docNumber: docNumber,
        country: country,
        city: city,
        address: address,
        monthlySalary: monthlySalary,
        email: email,
        loanAmount:loanAmount,
        loanTerm:loanTerm,
        loanInterestPayDay:loanInterestPayDay,
        code:code
      }), {headers: this.headers})
      .toPromise()
      .then(ress => ress.json().data)
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
