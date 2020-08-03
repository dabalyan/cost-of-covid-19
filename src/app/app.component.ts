import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CountryWisePopulation} from './app.meta-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  formGroup: FormGroup;
  infected: number;
  deaths: number;

  countryWisePopulation: { population: number, name: string }[];
  countryMatchedWithPopulation: string;

  constructor(private formBuilder: FormBuilder) {
    this.countryWisePopulation = CountryWisePopulation.sort((countryA,
                                                             countryB) => {
      if (countryA.population > countryB.population) {
        return 1;
      }
      if (countryA.population < countryB.population) {
        return -1;
      }
      return 0;
    });
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      population: [7800],
      infectionRate: [.24],
      mortalityRate: [3.7]
    });

    this.calculateCost();
    this.formGroup.valueChanges.subscribe(() => {
      this.calculateCost();
    });

    this.matchCountryWithPopulation();
    this.formGroup.get('population').valueChanges.subscribe(() => {
      this.matchCountryWithPopulation();
    });
  }

  calculateCost(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    const {population: {value: p}, infectionRate: {value: ir}, mortalityRate: {value: dr}} = this.formGroup.controls;
    this.infected = Math.round(1000000 * p * ir / 100);
    this.deaths = Math.round(this.infected * dr / 100);
  }

  matchCountryWithPopulation(): void {
    const {population: {value}} = this.formGroup.controls;
    const population = value * 1000000;
    const populationLowBound = population - population / 100; // 1%
    const populationHighBound = population + population / 100; // 1%

    const matchedCountry = this.countryWisePopulation.find(country => {
      return country.population >= populationLowBound && country.population < populationHighBound;
    });

    if (matchedCountry) {
      this.countryMatchedWithPopulation = matchedCountry.name;
    } else {
      const world = this.countryWisePopulation[this.countryWisePopulation.length - 1];
      const closestMatchedCountry = this.countryWisePopulation.find((country, index) => {
        return population < country.population;
      }) || world;

      const percentagePopulation = Math.round(population / closestMatchedCountry.population * 100);
      this.countryMatchedWithPopulation = `${percentagePopulation}% of ${closestMatchedCountry.name}`;
    }
  }
}
