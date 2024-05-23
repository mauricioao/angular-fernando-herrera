import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { tap, switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.countriesService.searchCountryByAlphaCode(id))
      )
      // .subscribe( (params: Params) => {
      // .subscribe( ({id}: Params) => {
      .subscribe(country => {
        // console.log({params: params['id']})
        // console.log({params: id})

        // observable hells
        // this.countriesService.searchCountryByAlphaCode(id)
        //   .subscribe( country => {
        //     console.log({country});
        //   })

        // this.searchCountry(id);
        if (!country) return this.router.navigateByUrl('');
        // return
        return this.country = country;
      })
  }

  searchCountry(code: string): void {
    this.countriesService.searchCountryByAlphaCode(code)
      .subscribe(country => {
        console.log({ country });
      })
  }

}
