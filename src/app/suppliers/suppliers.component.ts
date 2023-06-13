import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SuppliersService } from '../services/suppliers.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { from } from 'rxjs';
import { Router } from '@angular/router';
``
@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {
  selectedFile: File | null = null;
  SupplierList: any[] = [];
  selectedSupplier: any;
  formData!: FormGroup;
  countries: any[] = [];
  countriesLoaded: boolean = false;
  constructor(private suppliersService: SuppliersService, private formBuilder: FormBuilder, private _location: Location, private router: Router) {

  }

  ngOnInit() {
    this.formData = this.formBuilder.group({
      SupplierFN: ['', Validators.required],
      SupplierLN: ['', Validators.required],
      SupplierEmail: ['', [Validators.required, Validators.email]],
      SupplierMobileNo: ['', Validators.required],
      SupplierAddress: ['', Validators.required],
      Country: '',
      Material: ['', Validators.required],
      SupplierMsg: ''
    });
    this.suppliersService.getCountries().subscribe(
      response => {
        this.countries = response.data.geonames.map((obj: any) => ({
          countryName: obj.countryName,
          countryCode: obj.countryCode
        }));
        this.countriesLoaded = true;

      },
      error => {
        console.error('Error fetching countries:', error);
      }
    );
  }

  getSuppliers() {
    this.suppliersService.getSupplierList().subscribe(
      (response: any) => {
        this.SupplierList = response;
      },
      (error) => {
        console.error('Error fetching Supplier list', error);
      }
    );
  }

  getSupplierDetails(id: number) {
    this.suppliersService.getSupplier(id).subscribe(
      (response: any) => {
        this.selectedSupplier = response;
      },
      (error) => {
        console.error('Error fetching Supplier details', error);
      }
    );
  }

  sendFormData(formData: any): void {
    console.log(formData)
    this.suppliersService.addSupplier(formData.value)
      .subscribe(
        response => {
        },
        error => {
          if (error.status === 200) {
            console.log(error)
              alert("Supplier Created successfully")
              this.router.navigateByUrl('/home');
            }
          else{
          console.log(error.error[0])
            alert(error.error[0]);
          }
        }
      );
  }
}

