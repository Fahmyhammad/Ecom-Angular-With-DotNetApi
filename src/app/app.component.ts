import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IProduct } from './shared/Models/Product';
import { IPagnation } from './shared/Models/Pagnation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  title = 'client';
}
