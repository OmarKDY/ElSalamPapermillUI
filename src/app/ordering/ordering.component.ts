import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Location} from '@angular/common';
import { from } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ordering',
  templateUrl: './ordering.component.html',
  styleUrls: ['./ordering.component.css']
})

export class OrderingComponent implements OnInit {
  formData: FormGroup;
  currentTab: string = 'liton_tab_3_1';
  countries: any[] = [];
  cities: string[] = [];
  selectedCountry: any = '';
  countriesLoaded: boolean = false;
  citiesLoaded: boolean = false;
  selectedCity: string = '';
  selectedCardBoard: string = '';
  selectedCutType: string = '';
  eleRef: any
  CardboardTypeDDL= [
  'appartment', 'depulex', 'Condos', 'villas'
  ];
  CutTypesDDL= [
    'half', 'full', 'traingle', 'circle'
    ];


  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private _location: Location, private router: Router) { 
    this.formData = this.formBuilder.group({
      CompanyName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Website: '',
      Phone: ['', Validators.required],
      ApplicantsName: ['', Validators.required],
      ApplicantsPhone: ['', Validators.required],
      Country: [''],
      City: [''],
      Area: '',
      DetailedAddress: '',
      CardboardType: ['', Validators.required],
      CutTypes: ['', Validators.required],
      LengthAndDiameter: [null, Validators.required],
      Width: [null, Validators.required],
      QuantityType: ['', Validators.required],
      Quantity: [null, Validators.required],
      Notes: ''
    });
  }

  ngOnInit() {
  }

  
  switchTab(tabId: string): void {
    const currentTabElement = document.getElementById(this.currentTab);
    const nextTabElement = document.getElementById(tabId);
  
    if (currentTabElement && nextTabElement) {
      currentTabElement.classList.remove('show', 'active');
      currentTabElement.classList.add('fade');
  
      nextTabElement.classList.remove('fade');
      nextTabElement.classList.add('show', 'active');
  
      this.currentTab = nextTabElement.id;
    }
  }
  
  nextTab(): void {
    const currentTabElement = document.getElementById(this.currentTab);
    const nextTabElement = currentTabElement?.nextElementSibling as HTMLElement;
  
    if (nextTabElement) {
      this.switchTab(nextTabElement.id);
    }
  }
  
  prevTab(): void {
    const currentTabElement = document.getElementById(this.currentTab);
    const prevTabElement = currentTabElement?.previousElementSibling as HTMLElement;
  
    if (prevTabElement) {
      this.switchTab(prevTabElement.id);
    }
  }

  ShippingOnClick() {
    from(this.apiService.getCountries()).subscribe(
      response => {
        this.countries = response.data.geonames.map((obj: any) => ({
          countryName: obj.countryName,
          countryCode: obj.countryCode
        }));
        this.countriesLoaded = true;
        console.log(response.data.geonames);
        console.log(this.selectedCountry);
      },
      error => {
        console.error('Error fetching countries:', error);
      }
    );
  }
  
  async onCountryChange(event: any) {
    const selectedValue = event.split('-');
    const countryCode = selectedValue[0];
    const countryName = selectedValue[1];
    this.selectedCountry = event;
    if (this.selectedCountry) {
      try {
        const response = await this.apiService.getCities(countryCode);
        this.cities = response.data.geonames.map((obj: any) => obj.name);
        this.citiesLoaded = true;
        console.log(this.cities);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    } else {
      this.cities = [];
      this.citiesLoaded = false;
    }
  }
  onCityChange(city: string){
    this.selectedCity = city
  }
  sendFormData(formData: any): void {
    formData.value.Country = this.selectedCountry;
    formData.value.City = this.selectedCity;
  
    console.log(formData.value);
    
    this.apiService.sendOrderReq(formData.value)
      .subscribe(
        response => {
        },
        error => {
          if (error.status == 200) {
            alert("Order added successfully. An email has been sent to us. We will review your order and contact you.");
            this.router.navigateByUrl('/home');
          } else {
            alert("Please fill the required fields.");
          }
        }
      );
  }
  
  eventChangeCardboard(selectedValue: string) {
    console.log(selectedValue);
    this.selectedCardBoard = selectedValue;
    this.formData.controls['CardboardType'].setValue(selectedValue);
  }
  
  eventChangeCut(selectedValue: string) {
    console.log(selectedValue);
    this.selectedCutType = selectedValue;
    this.formData.controls['CutTypes'].setValue(selectedValue);
  }

}