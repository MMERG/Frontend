///<reference path="city.service.ts"/>
/**
 * Created by MT on 2017-03-01.
 */
import { Component } from '@angular/core';
import { City } from './city';
import { CityService } from './city.service';

@Component({
  selector: 'city-list',
  templateUrl: 'citylist.component.html',
  providers: [CityService]
})
export class CityListComponent {
  cities: City[];

  onSelect(countryId: number) {
    this.cities = CityService.getCities()
      .filter((country) => country.countryId == countryId);
  }
}
