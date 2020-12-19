import { Observable } from 'rxjs/internal/Observable';
import { HttpService } from './../services/http.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  products: Observable<any[]>;
  productForm: FormGroup;
  isSubmitted = false;

  constructor(private httpservice: HttpService,
              private router: Router) {
    this.fetchProducts();
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.fetchProducts();
    });
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      price: new FormControl('', [
        Validators.required,
        Validators.maxLength(8)
      ])
    });

  }

  fetchProducts(): void{
  this.httpservice.getProducts().subscribe((res: any) => {this.products = res.body; });
  }

  deleteProduct(id): void{
    this.httpservice.deleteProduct(id);
    this.router.navigateByUrl('/products');
  }

  addProduct(form): void{
    this.isSubmitted = true;
    if (this.productForm.valid) {
      this.httpservice.Create(form.value);
      this.productForm.reset();
      this.isSubmitted = false;
      this.router.navigateByUrl('/products');
    }
  }
}
