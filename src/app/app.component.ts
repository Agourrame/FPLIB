import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TableModule,
    DialogModule,
    RippleModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialogModule,
    InputTextModule,
    InputTextareaModule,
    CommonModule,
    FileUploadModule,
    DropdownModule,
    TagModule,
    RadioButtonModule,
    RatingModule,
    InputTextModule,
    FormsModule,
    InputNumberModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService, ConfirmationService],
})
export class AppComponent implements OnInit {
  BookDialog: boolean = false;
  book: any;

  apiKey = 'IVdfvkEkqEQ074NGPmYvqeRisEUPQPWusjhR9SAejephnur8ms8E53DzNhPBSGjV';

  constructor(
    private primengConfig: PrimeNGConfig,
    private api:ApiService
    ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;

    var axios = require('axios');
var data = JSON.stringify({
    "collection": "students",
    "database": "school",
    "dataSource": "Cluster93482",
    "projection": {
        "_id": 1
    }
});

var config = {
    method: 'post',
    url: 'https://eu-west-2.aws.data.mongodb-api.com/app/data-cwegyzw/endpoint/data/v1/action/findOne',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': this.apiKey,
    },
    data: data
};

axios(config)
    .then(function (response: { data: any; }) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error: any) {
        console.log(error);
    });


    // this.api.getBooks().subscribe(ele=>{
    //   console.log(ele);
    // })
  }

  Library: any = [];
  selectedBook: any;

  title = 'library_managment';

  openNew() {
    this.BookDialog=true;
  }
}
