import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgModel } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// Interface
import {SelectedTarget, CompanyInfo} from './target.interface';

// Service
import { TargetService } from './target.service';

@Component({
  selector: 'target-info',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.scss']
})
export class TargetComponent implements OnInit, OnDestroy {

  public targetForm: FormGroup;

  public targetDetails: any;

  public selectedItem: SelectedTarget;

  constructor(private fbuilder: FormBuilder,
              private targetService: TargetService) {
     const companyInfo: CompanyInfo = <CompanyInfo>{};
     this.selectedItem = {
       companyInfo: companyInfo,
       status: '',
       financialPerformance: ''
     };
  }

  public ngOnInit(): void {
    this.targetForm = this.fbuilder.group({
      companyName: ['', [Validators.required]],
      companyStatus: ['', [Validators.required]],
      companyType: ['', [Validators.required]],
      financialPerformance: ['', [Validators.required]]
    });
    this.getTargetDetails();
  }

  public ngOnDestroy(): void {

  }

  /**
   * Used to get book details
   * @returns void
   */

  private getTargetDetails(): void {
    this.targetService.getBookDetails().subscribe((response: any) => {
        this.targetDetails = response;
    });
  }

  /**
   * Used to deleted selected book
   * @returns void
   */

  public deleteSelectedTarget(index: number): void {
      this.targetDetails.targets.splice(index, 1);
  }

  /**
   * Used to edit selected book item
   * @returns void
   */

  public editTargetItem(targetItem: any): void {
    this.selectedItem = Object.assign({}, targetItem);
  }

  /**
   * Used to create new book entry
   * @returns void
   */

  public createNewBook(targetForm: FormGroup): void {
    const newComoanyName = targetForm.controls.companyName.value;
    const newCompanyStatus = targetForm.controls.companyStatus.value;
    const newCompanyType = targetForm.controls.companyType.value;
    const newFinancialPerformance = targetForm.controls.financialPerformance.value;
    const newTargetObject = {
      companyInfo: {
        companyName: newComoanyName,
        companyType: newCompanyType
      },
      status: newCompanyStatus,
      financialPerformance: newFinancialPerformance
    };
    this.targetDetails.targets.unshift(newTargetObject);
  }

  /**
   * Used to select the editable / read only template
   * @returns boolean
   */

  public selectedTemplate(item: any): boolean {
    return item.companyInfo.companyName === this.selectedItem.companyInfo.companyName ? true : false;
  }

  /**
   * Used to update selected book entries
   * @returns void
   */

  public updateSelectedTarget(index: number): void {
    this.targetDetails.targets[index] = Object.assign({}, this.selectedItem);
    this.cancelUpdate();
  }

  /**
   * Used to cancel/reset
   * @returns void
   */

  public cancelUpdate(): void {
    const companyInfo: CompanyInfo = <CompanyInfo>{};
    this.selectedItem.companyInfo = companyInfo;
  }
}
