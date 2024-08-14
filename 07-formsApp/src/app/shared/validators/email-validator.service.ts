import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailValidator implements AsyncValidator {

  constructor() { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const email = control.value;
    console.log({ email });

    const httpCallObservable = new Observable<ValidationErrors | null>(subscriber => {
      console.log({ email });
      if (email === 'mauricio@google.com') {
        subscriber.next({ emailTaken: true });
        subscriber.complete();
        // return;
      }
      subscriber.next(null);
      subscriber.complete();
    })
    // .pipe(
    //   delay(3000)
    // );
    return httpCallObservable.pipe(
      delay(3000)
    );
  }

  // validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
  //   const email = control.value;
  //   console.log({email});

  //   return of({
  //     emailTaken: true
  //   }).pipe(
  //     delay(3000)
  //   )
  // }

}
