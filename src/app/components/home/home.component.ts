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

  initChart(casetype: string) {
    let datatable = [];

    datatable.push(["Country", "Cases"])
    this.globalCovidData.forEach(cs => {
      let value: number;

      if (casetype == 'c'){
        if (cs.confirmed > 35000)
          value = cs.confirmed
      console.log(value);
    }

      if (casetype == 'a'){
        if (cs.active > 35000)
          value = cs.active
      console.log(value);
    }

      if (casetype == 'r'){
        if (cs.recovered > 25000)
          value = cs.recovered
      console.log(value);
    }

      if (casetype == 'd'){
        if (cs.death > 3000)
          value = cs.death
      console.log(value);
    }
    
      datatable.push([
        cs.country, value


      ])

    })



    this.pieChart = {
      chartType: 'PieChart',
      dataTable: datatable,
      //firstRowIsData: true,
      options: { height: 500 },
    };
    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: datatable,
      //firstRowIsData: true,
      options: { height: 500 },
    };
  }

  ngOnInit(): void {

    this.dataService.getGlobalCoronaData()
      .subscribe(
        {
          next: (result) => {
            console.log(result)
            this.globalCovidData = result

            result.forEach(cs => {
              if (!Number.isNaN(cs.confirmed)) {


                this.totalConfirmed = this.totalConfirmed + cs.confirmed

                this.totalActive += cs.active
                this.totalRecoverd += cs.recovered
                this.totalDeath += cs.death

              }

            })
            this.initChart('c');
          }

        })


  }
  updateChart(input: HTMLInputElement) {
    this.initChart(input.value)
}

}
