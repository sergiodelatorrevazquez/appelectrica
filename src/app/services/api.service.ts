import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  http = inject(HttpClient);

  constructor (){ }

  getPrices(){
    const headers = {
      "x-api-key": environment.apiEsios
    };

    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    const params = {
      start_date: `${year}-${month}-${day}`,
      end_date: `${year}-${month}-${day}`,
      geo_agg: "sum",
      time_trunc: 'hour',
    }

    const uri = environment.urlApi + "?start_date=" + `${year}-${month}-${day}` + "T" + "00:00:00&end_date=" +
                `${year}-${month}-${day}` + "T" + "23:00:00+01:00&geo_agg=sum&geo_ids&time_trunc=hour&time_agg=&locale=es"

    return this.http.get(uri, { headers : headers });
  }
}
