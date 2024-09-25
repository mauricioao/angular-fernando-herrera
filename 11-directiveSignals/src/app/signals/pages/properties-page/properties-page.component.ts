import { Component, computed, effect, signal, OnDestroy } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css',
})
export class PropertiesPageComponent implements OnDestroy {

  public counter = signal(10);

  public user = signal<User>({
    id: 1,
    email: 'LxKp7@example.com',
    first_name: 'Jordi',
    last_name: 'Perez',
    avatar: 'https://reqres.in/img/faces/1-image.jpg'
  })

  public fullName = computed(() => `${this.user().first_name} ${this.user().last_name}`);

  public userChangeEffect = effect(() => console.log('User changed', `${this.user().first_name} ${this.counter()}`))

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  onFieldUpdated( field: keyof User, value: string ) {

    // this.user.set({
    //   ...this.user(),
    //   [field]: value,
    // });

    // this.user.update( current => ({
    //   ...current,
    //   [field]: value
    // }))

    this.user.update( current => {


      switch ( field ) {

        case 'email':
          current.email = value;
          break;

        case 'avatar':
          current.avatar = value;
          break;

        case 'first_name':
          current.first_name = value;
          break;

        case 'last_name':
          current.last_name = value;
          break;

        case 'id':
          current.id = Number( value );
        break;
      }


      return { ...current };
    } );

  }

  increaseBy(value: number) {
    this.counter.update(current => current + value);
  }

}
