import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobsService } from '../services/jobs.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { from } from 'rxjs';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  selectedFile: File | null = null;
  candidateList: any[] = [];
  selectedCandidate: any;
  selectedCountry: any = '';
  filteredCountries: any[] = [];
  formData!: FormGroup;
  countries: any[] = [];
  countriesLoaded: boolean = false;
  constructor(private jobsService: JobsService, private formBuilder: FormBuilder, private _location: Location, private router: Router) {

  }

  ngOnInit() {
    this.formData = this.formBuilder.group({
      CandidateFN: ['', Validators.required],
      CandidateLN: ['', Validators.required],
      CandidateEmail: ['', [Validators.required, Validators.email]],
      CandidateMobileNo: ['', Validators.required],
      CandidateAddress: ['', Validators.required],
      Country: '',
      CandidateJobTitle: ['', Validators.required],
      CandidateMsg: '',
      CandidateCV: ['']
    });
    this.onDDL();
  }

  onDDL(){
    this.jobsService.getCountries().subscribe(
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
  onSearch(event: any): void {
    debugger
    console.log(event)
    if (event.key.length >= 1) {
      this.filteredCountries = this.countries.filter(country => {
        const fullCountryName = `${country.countryCode} - ${country.countryName}`;
        return fullCountryName.toLowerCase().startsWith(event.key.toLowerCase());
      });
      this.countries = this.filteredCountries;
    } else {
      this.countries = this.countries
    }
  }

  getCandidates() {
    this.jobsService.getCandidateList().subscribe(
      (response: any) => {
        this.candidateList = response;
      },
      (error) => {
        console.error('Error fetching candidate list', error);
      }
    );
  }

  getCandidateDetails(id: number) {
    this.jobsService.getCandidate(id).subscribe(
      (response: any) => {
        this.selectedCandidate = response;
      },
      (error) => {
        console.error('Error fetching candidate details', error);
      }
    );
  }

  sendFormData(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('CandidateCV', this.selectedFile, this.selectedFile.name);

      // Append other form data to the formData object
      formData.append('CandidateFN', this.formData.value.CandidateFN);
      formData.append('CandidateLN', this.formData.value.CandidateLN);
      formData.append('CandidateEmail', this.formData.value.CandidateEmail);
      formData.append('CandidateMobileNo', this.formData.value.CandidateMobileNo);
      formData.append('CandidateAddress', this.formData.value.CandidateAddress);
      formData.append('Country', this.selectedCountry);
      formData.append('CandidateJobTitle', this.formData.value.CandidateJobTitle);
      formData.append('CandidateMsg', this.formData.value.CandidateMsg);
      debugger
      this.jobsService.addCandidate(formData)
        .subscribe(
          response => {
            console.log(response)
          },
          error => {
            if (error.status === 200) {
            console.log(error)
              alert("Candidate request has been sent successfully")
              this.router.navigate(['/home'])
              .then(() => {
                window.location.reload();
              });            }
            else{
            console.log(error.error[0])
              alert(error.error[0]);
            }
          }
        );
    }
    else {
      alert("Please Add Your CV")
    }
  }

  // sendFormData(formData: any): void {
  //   console.log(formData)
  //   this.jobsService.addCandidate(formData.value)
  //     .subscribe(
  //       response => {
  //       },
  //       error => {
  //         if(error.status == 200 ){
  //           alert("Candidate request has been sent successfully")
  //           this._location.back();
  //         }
  //         else{
  //           alert("Please Fill The Required Fields")
  //         }
  //       }
  //     );
  // }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  onCountrySelect(value: string): void {
    this.selectedCountry = value;
  }
}

