import { Component } from '@angular/core';
import { CalculatorComponent } from './components/calculator/calculator.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [CalculatorComponent],
})
export class AppComponent {}
