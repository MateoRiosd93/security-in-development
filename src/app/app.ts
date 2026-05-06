import { Component, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { HashingComponent } from './components/hashing/hashing.component';
import { ExploitationXssComponent } from './components/exploitation-xss/exploitation-xss.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatTabsModule, MatCardModule, HashingComponent, ExploitationXssComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('hashing-angular');
}
