import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { KnobModule } from 'primeng/knob';

import { AppComponent } from './app.component';
import { CalculatorComponent } from './components/calculator/calculator.component';

@NgModule({
  declarations: [AppComponent, CalculatorComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    CardModule,
    InputNumberModule,
    ButtonModule,
    ChartModule,
    ProgressSpinnerModule,
    KnobModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
