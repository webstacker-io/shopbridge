import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  product: any;
  id: any;

  constructor(private httpservice: HttpService,
              private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    this.fetchProductDetail(this.route.snapshot.paramMap.get('id'));


  }
  fetchProductDetail(id): any{
    this.httpservice.getProductById(id).subscribe(res => this.product = res[0]);
  }

}
