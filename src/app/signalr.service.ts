import { Injectable } from '@angular/core';
import {HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Iprpoerty } from './property.model';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private connection: HubConnection;
  public landStatusUpdates = new BehaviorSubject<Iprpoerty>(null);

  private apiUrl = 'https://inffy24-001-site1.etempurl.com';

  constructor(private http: HttpClient) { 
    this.connection = new HubConnectionBuilder()
      .withUrl('https://inffy24-001-site1.etempurl.com/propertyHub')
      .build();

    this.connection.on('ReceivePropertyUpdate', (property:Iprpoerty) => {
      this.landStatusUpdates.next(property);
    });

    this.connection.start().catch(err => console.error(err));
  }

  changeLandStatus(number: number, status: any) {
    this.http.put(`${this.apiUrl}/api/Property/${number}`, status)
      .subscribe({
        next:(res)=>{
          console.log(res);
        },
        error: err => console.error(err)
      });
  }

  getAllProperties(){
    return this.http.get(`${this.apiUrl}/api/Property`);
  }
}
