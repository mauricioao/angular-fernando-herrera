import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: ``
})
export class SelectorPageComponent implements OnInit {

  public countriesByRegion: SmallCountry[] = [];
  public bordersByCountry: SmallCountry[] = [];

  public myForm: FormGroup = this.fb.group({
    region: ['', [Validators.required]],
    country: [{value: '', disabled: this.countriesByRegion.length === 0}, [Validators.required]],
    border: [{value: '', disabled: this.bordersByCountry.length === 0}, [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService,
  ) { }

  ngOnInit(): void {
    this.onRegionChanged();
    this.onCountrychanged();
  }


  get regions(): Region[] {
    return this.countriesService.regions;
  }

  onRegionChanged(): void {
    this.myForm.get('region')!.valueChanges
    .pipe(
      tap( () => {
        this.myForm.get('country')!.setValue('');
        this.myForm.get('country')!.disable();
      } ),
      // tap( () => this.myForm.get('country')!.reset('') ),
      switchMap( region => this.countriesService.getCountriesByRegion( region ) ),
      )
      .subscribe(countries => {
        if(countries.length > 0) {
          this.myForm.get('country')!.enable();
          this.countriesByRegion = countries.sort((a,b) => a.name.localeCompare(b.name) );
          return;
        }
    })
  }

  onCountrychanged(): void {
    this.myForm.get('country')!.valueChanges
    .pipe(
      tap( () => {
        this.myForm.get('border')!.setValue('')
        this.myForm.get('border')!.disable()
      } ),
      filter((value: string)=> value.length > 0),
      switchMap( alphaCode => this.countriesService.getCountryByAlphaCode( alphaCode ) ),
      switchMap( country => this.countriesService.getCountriesByCodes( country.borders ) ),
      )
      .subscribe(countries => {
        if(countries.length > 0) {
          this.myForm.get('border')!.enable()
          this.bordersByCountry = countries.sort((a,b) => a.name.localeCompare(b.name) );
          return;
        }
        // console.log({countries});
    })
  }

}
