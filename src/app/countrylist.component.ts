///<reference path="country.service.ts"/>
/**
 * Created by MT on 2017-03-01.
 */
import { Component } from '@angular/core';
import { Country } from './country';
import { CountryService } from './country.service';

@Component({
  selector: 'country-list',
  templateUrl: 'countrylist.component.html',
  providers: [CountryService]
})
export class CountryListComponent {
  selectedCountry: Country = new Country(130, 'LIETUVA');
  countries: Country[];

  constructor(private _locationService: CountryService) {
    this.countries = CountryService.getCountries();
  }
}
