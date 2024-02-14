import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  coust = 0;
  price = 0;
  gainPercentage = 30;

  linhas = [
    { gram: '', price: '', use: '' }
  ];

  addLinha() {
    this.linhas.push({ gram: '', price: '', use: '' });
  }

  removeLinha(i: number) {
    this.linhas.splice(i, 1)
  }

  calc(): void {
    this.coust = 0;
    this.price = 0;
    for (let linha of this.linhas) {
      const price = linha.price.replace(/,/, '.');
      this.coust += (+linha.use) * (+price) / (+linha.gram);
    }
    this.price = (this.coust * 2) + (this.coust / 100 * this.gainPercentage);
  }

}
