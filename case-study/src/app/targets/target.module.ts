import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TargetComponent } from './target.component';
// Service
import { TargetService } from './target.service';

@NgModule({
  declarations: [
    TargetComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule
  ],
  providers: [TargetService],
  bootstrap: [TargetComponent]
})
export class TargetModule { }
