import { Component, OnInit } from '@angular/core';
import { DataServieService } from 'src/app/services/data-servie.service';
import { GlobalDataSummary } from 'src/app/models/global-covid-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed = 0 ;
  totalActive = 0;
  totalRecoverd = 0;
  totalDeath = 0 ;

  globalCovidData : GlobalDataSummary[];

  constructor(private dataService:DataServieService) { }

  ngOnInit(): void {

    this.dataService.getGlobalCoronaData()
    .subscribe(
      {
        next : (result)=>{
          console.log(result)
          this.globalCovidData = result

          result.forEach(cs=>{
            if (!Number.isNaN(cs.confirmed)) {
              
              
              this.totalConfirmed = this.totalConfirmed + cs.confirmed

              this.totalActive += cs.active
              this.totalRecoverd += cs.recovered
              this.totalDeath += cs.death
              
            }
            
          })
      }
      
    })
  }

}
