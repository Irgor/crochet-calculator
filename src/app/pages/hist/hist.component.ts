import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddListComponent } from 'src/app/components/add-list/add-list.component';


@Component({
  selector: 'app-hist',
  templateUrl: './hist.component.html',
  styleUrls: ['./hist.component.scss']
})
export class HistComponent implements OnInit {

  items: any[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const pecasString = localStorage.getItem('pecas');

    if (pecasString) {
      this.items = JSON.parse(pecasString);
    }
  }


  saveData(data?: any) {
    if(data) {
      this.items.push(data);
    }

    localStorage.setItem('pecas', JSON.stringify(this.items));
    this.loadData();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddListComponent, {
      data: {
        name: '',
        price: '',
        coust: '',
        lines: '',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && !!result && !!result.name) {
        this.saveData(result);
      }
    });
  }

  remove(name: String) {
    console.log(this.items)
    this.items = this.items.filter(item => item && item.name != name);

    this.saveData();
  }

  getPrice(price?: string) {
    if (price) {
      return +price.replace(/,/, '.');
    }

    return 0;
  }

}
