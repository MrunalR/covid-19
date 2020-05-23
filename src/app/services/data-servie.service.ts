import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GlobalDataSummary } from '../models/global-covid-data';

@Injectable({
  providedIn: 'root'
})
export class DataServieService {


  private getGlobalCoronaDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/05-22-2020.csv';
  constructor(private http: HttpClient) { }

  getGlobalCoronaData() {
    return this.http.get(this.getGlobalCoronaDataUrl, { responseType: 'text' }).pipe(
      map(result => {

        let data: GlobalDataSummary[] = [];
        let raw = {}

        let rows = result.split('\n');
        rows.splice(0,1);

        rows.forEach(row => {
          let cols = row.split(/,(?=\S)/)
          // console.log(cols);

          let cs = {
            country: cols[3],
            confirmed: +cols[7],
            active: +cols[10],
            recovered: +cols[9],
            death: +cols[8], 
          };
          
          let temp=raw[cs.country];
          if (temp) {
            temp.confirmed = cs.confirmed + temp.confirmed;
            temp.active = cs.active + temp.active;
            temp.recovered = cs.recovered + temp.recovered;
            temp.death = cs.death + temp.death;

            raw[cs.country] = temp;

          }
           else {
            raw [cs.country] =cs;
          }
        })
        return <GlobalDataSummary[]>Object.values(raw);
      })
    )

  }
}
