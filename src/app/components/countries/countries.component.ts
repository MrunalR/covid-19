import { Component, OnInit } from '@angular/core';
import { DataServieService } from 'src/app/services/data-servie.service';
import { GlobalDataSummary } from 'src/app/models/global-covid-data';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  totalConfirmed = 0 ;
  totalActive = 0;
  totalRecoverd = 0;
  totalDeath = 0 ;

  data : GlobalDataSummary[];
  countries :string[]= [];

  constructor(private service : DataServieService) { }

  ngOnInit(): void {

    this.service.getGlobalCoronaData().subscribe(result=>{
      this.data = result;
      this.data.forEach(cs=>{
        this.countries.push(cs.country);
        console.log(this.countries);
        
      })
    })

     }
     updateVaule(country : String){
      console.log(country);
      
      this.data.forEach(cs=>{
        if (cs.country == country) {
          
          
          this.totalConfirmed = cs.confirmed

          this.totalActive = cs.active
          this.totalRecoverd = cs.recovered
          this.totalDeath = cs.death
          
        }
        
      })

    }


}
