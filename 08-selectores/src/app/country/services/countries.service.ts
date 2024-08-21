import { Injectable } from '@angular/core';
import { Country, Region, SmallCountry } from '../interfaces/country.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, map, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private readonly baseUrl: string = 'https://restcountries.com/v3.1';

  private _regions: Region[] = [Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania];

  constructor(
    private http: HttpClient
  ) { }

  get regions(): Region[] {
    return [  ...this._regions ];
  }

  getCountriesByRegion( region: Region ): Observable<SmallCountry[]> {
    if(!region) return of([]);
    const url = `${this.baseUrl}/region/${ region }?fields=cca3,name,borders`;
    return this.http.get<Country[]>(url)
      .pipe(
        map( countries => countries.map(({name, cca3, borders = [] }) => ({name: name.common, cca3, borders}))),
        // tap( console.log )
      )
  }

  getCountryByAlphaCode( alphaCode: string ): Observable<SmallCountry> {
    if(!alphaCode) return of({
      name: '',
      cca3: '',
      borders: [],
    });
    const url = `${this.baseUrl}/alpha/${ alphaCode }?fields=cca3,name,borders`;
    return this.http.get<Country>(url)
      .pipe(
        map( country => ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? []
          }))
        // tap( console.log )
      )
  }

  getCountriesByCodes( borders: string[] = [] ): Observable<SmallCountry[]>
   {
    if(!borders || borders.length === 0) return of([]);
    const countryRequests: Observable<SmallCountry>[] = [];
    borders.forEach( border => {
      const request = this.getCountryByAlphaCode(border);
      countryRequests.push(request);
    })
    return combineLatest( countryRequests );
  }
}
