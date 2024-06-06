import { Component } from '@angular/core';
import { Observable, interval, tap } from 'rxjs';

@Component({
  selector: 'app-uncommon-page',
  templateUrl: './uncommon-page.component.html',
  styleUrl: './uncommon-page.component.css'
})
export class UncommonPageComponent {
  //i18nSelect
  public name: string = 'Mauricio';
  public gender: 'male'|'female' = 'male';

  public invitationMap = {
    'male': 'invitarlo',
    'female': 'invitarla'
  }

  changeClient() {
    this.name = 'Lorena';
    this.gender = 'female';
  }

  //i18nPlural
  public clients: string[] = ['Maria', 'Pedro', 'Lorena', 'Juan', 'Mauricio', 'Luciana', 'Hannah'];
  public clientsMap = {
    '=0': 'no tenemos ningún cliente esperando',
    '=1': 'tenemos un cliente esperando',
    '=2': 'tenemos 2 clientes esperando',
    'other': 'tenemos # clientes esperando'
  }

  deleteClient() {
    this.clients.shift();
  }

  //KeyValue Pipe
  public person = {
    name: 'Mauricio',
    age: 33,
    address: 'Av. José Leal 370'
  }

  //Async Pipe
  public myObservableTimer: Observable<number> = interval(2000)
    .pipe(
      tap(value => console.log('tap:', value))
    )

  public promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Tenemos data de promesa.');
    }, 3500);
  })

}
