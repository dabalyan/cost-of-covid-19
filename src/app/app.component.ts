import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {debounceTime, shareReplay} from 'rxjs/operators';
import {ajaxGetJSON} from 'rxjs/internal-compatibility';
import {Cities, Continents, Countries, DefaultIr, DefaultMr, Million, Regions, WorldPopulation} from './app.meta-data';

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
  chronicallyIll: number;

  places: { population: number, name: string, country?: string }[];
  placeMatchedWithPopulation: string;
  placeMatchedWithInfected: string;
  placeMatchedWithDeaths: string;

  currentInfectionRate: number;
  currentMortalityRate: number;

  readonly latestStats = ajaxGetJSON('https://covid19api.xapix.io/v2/latest')
    .pipe(shareReplay(1)) as Observable<{ latest: { confirmed: number, deaths: number } }>;

  readonly queryParamsUpdater = new Subject<{ p: number; ir: number; mr: number }>();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.places = Countries.concat(Cities).concat(Regions).concat(Continents).sort((
      countryA,
      countryB
    ) => {
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
    const urlSearchParams = new URLSearchParams(location.search);
    this.formGroup = this.formBuilder.group({
      population: [+urlSearchParams.get('p') || WorldPopulation],
      infectionRate: [+urlSearchParams.get('ir') || DefaultIr],
      mortalityRate: [+urlSearchParams.get('mr') || DefaultMr]
    });


    this.updateWithLatestData(!location.search);

    this.queryParamsUpdater.pipe(
      debounceTime(200)
    ).subscribe((queryParams) => {
      this.router.navigate([], {queryParams, replaceUrl: true});
    });

    this.calculateCost();
    this.formGroup.valueChanges.subscribe(() => {
      this.calculateCost();
    });
  }

  updateWithLatestData(updateInputParameters = true): void {
    this.latestStats.subscribe(summary => {
      const latestIr = +((summary?.latest?.confirmed / (WorldPopulation * Million)) * 100).toFixed(2);
      const latestMr = +((summary?.latest?.deaths / summary?.latest?.confirmed) * 100).toFixed(2);

      this.currentInfectionRate = latestIr;
      this.currentMortalityRate = latestMr;

      if (!updateInputParameters || this.formGroup.dirty) {
        return;
      }
      this.formGroup.patchValue({
        infectionRate: [isFinite(latestIr) && latestIr || DefaultIr],
        mortalityRate: [isFinite(latestMr) && latestMr || DefaultMr]
      });
    });
  }

  calculateCost(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    const {population: {value: p}, infectionRate: {value: ir}, mortalityRate: {value: mr}} = this.formGroup.controls;
    this.infected = Math.round(Million * p * ir / 100);
    this.deaths = Math.round(this.infected * mr / 100);
    this.chronicallyIll = Math.round(this.infected * 12 / 100);

    this.matchCountriesWithFigure(Million * p, this.infected, this.deaths);
    this.queryParamsUpdater.next({p, ir, mr});
  }

  matchCountriesWithFigure(population: number, infected: number, deaths: number): void {
    this.placeMatchedWithPopulation = this.matchPlaceWithPopulation(population);
    this.placeMatchedWithInfected = this.matchPlaceWithPopulation(infected);
    this.placeMatchedWithDeaths = this.matchPlaceWithPopulation(deaths);
  }

  matchPlaceWithPopulation(population: number): string {
    const populationLowBound = population - population / 100; // 1%
    const populationHighBound = population + population / 100; // 1%

    const matchedPlace = this.places.find(place => {
      return place.population >= populationLowBound && place.population < populationHighBound;
    });

    if (matchedPlace) {
      return `population of ${matchedPlace.name}`
        + (matchedPlace.country ? `, ${matchedPlace.country}` : '');
    }

    const world = this.places[this.places.length - 1];
    const closestMatchedPlace = this.places.find(place => {
      return population < place.population;
    }) || world;

    const percentagePopulation = Math.round(population / closestMatchedPlace.population * 100);
    return `${percentagePopulation}% population of ${closestMatchedPlace.name}`
      + (closestMatchedPlace.country ? `, ${closestMatchedPlace.country}` : '');
  }
}
