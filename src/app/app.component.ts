import { Component } from '@angular/core';
import { SpinnerService } from './Loader/spinner.service';
import { Iprpoerty } from './property.model';
import { SignalrService } from './signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Asaslive';

  properties:Iprpoerty[];
  constructor(private signalrService: SignalrService ,
       private spinner:SpinnerService
    ) { }

  changeStatus(property:any) {
    const newStatus = property.status === 1 ? 2 : property.status === 2 ? 3: 1
    property.status=newStatus
    console.log(property);
    this.signalrService.changeLandStatus(property.number, property);
  }

  ngOnInit(){
  this.spinner.show()
   this.signalrService.getAllProperties().subscribe({
    next:(data:any)=>{
      this.properties=data.result;
      this.spinner.hide();
      console.log(data)
    }
   })

   // Subscribe to real-time updates
   this.signalrService.landStatusUpdates.subscribe(update => {
    const land = this.properties?.find(p=>p.number==update.number);
    if (land) {
      land.status = update.status;
    } else {
      
      //this.properties.push(update);
    }
  });
  }
}
