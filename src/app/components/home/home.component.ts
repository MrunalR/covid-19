import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';

import { DataServieService } from 'src/app/services/data-servie.service';
import { GlobalDataSummary } from 'src/app/models/global-covid-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed = 0;
  totalActive = 0;
  totalRecoverd = 0;
  totalDeath = 0;

globalCovidData: GlobalDataSummary[];
  pieChart: GoogleChartInterface = {
    chartType: 'PieChart'
  }
  columnChart: GoogleChartInterface = {
    chartType: 'ColumnChart'
  }

  constructor(private dataService: DataServieService) { }

 

  ngOnInit(): void {

    this.dataService.getGlobalCoronaData()
      .subscribe(
        {
          next: (result) => {
            console.log(result)
            this.globalCovidData = result

            result.forEach(cs => {
              if (!Number.isNaN(cs.confirmed)) {

               
                this.totalConfirmed += cs.confirmed

                this.totalActive += cs.active
                this.totalRecoverd += cs.recovered
                this.totalDeath += cs.death

              }

            })
            this.initChart('c');
            console.log(this.initChart);
            
          }

        })


  }
  updateChart(input: HTMLInputElement) {
    console.log(input.value);
    
    this.initChart(input.value)
}

initChart(caseType: string) {
  let datatable = [];

  datatable.push(["Country", "Cases"])


  this.globalCovidData.forEach(cs => {
    let value :number ;

    if (caseType == 'c')
      if (cs.confirmed > 100)
        value = cs.confirmed
        
    if (caseType == 'a')
      if (cs.active > 2000)
        value = cs.active
        
    if (caseType == 'd')
      if (cs.death > 3000)
        value = cs.death
        
    if (caseType == 'r')
      if (cs.recovered > 3000)
          value = cs.recovered
      

      datatable.push([
          cs.country, value
          ])
        console.log(value);
  })
  


  this.pieChart = {
    chartType: 'PieChart',
    dataTable: datatable,
    //firstRowIsData: true,
    options: { height: 300,is3D:true },
  };
  this.columnChart = {
    chartType: 'ColumnChart',
    dataTable: datatable,
    //firstRowIsData: true,
    options: { height: 300,is3D:true },
  };
}


 

 

}
