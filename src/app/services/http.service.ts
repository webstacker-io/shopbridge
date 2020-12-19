import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endPoints } from '../global/constants';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

constructor(private httpClient: HttpClient) { }

public getProducts(): any{
  return this.httpClient.get<any>(`${endPoints.product}`,
    { observe: 'response' }).pipe(tap(res => {
      return res;
    }));
}
public getProductById(id): any{
  return this.httpClient.get<any[]>(endPoints.product + '/' + id);
}

public Create(requestObj): void{
  this.httpClient.post(endPoints.create, requestObj).subscribe(data => {
    console.log(data);
  });
}
public deleteProduct(id): void{
  this.httpClient.delete(endPoints.delete + id).subscribe(data => {
    console.log(data);
  });
}


}


