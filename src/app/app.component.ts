// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterOutlet } from '@angular/router';
// import { TableModule } from 'primeng/table';
// import { DialogModule } from 'primeng/dialog';
// import { RippleModule } from 'primeng/ripple';
// import { ButtonModule } from 'primeng/button';
// import { ToastModule } from 'primeng/toast';
// import { ToolbarModule } from 'primeng/toolbar';
// import { ConfirmDialogModule } from 'primeng/confirmdialog';
// import { InputTextModule } from 'primeng/inputtext';
// import { InputTextareaModule } from 'primeng/inputtextarea';
// import { FileUploadModule } from 'primeng/fileupload';
// import { DropdownModule } from 'primeng/dropdown';
// import { TagModule } from 'primeng/tag';
// import { RadioButtonModule } from 'primeng/radiobutton';
// import { RatingModule } from 'primeng/rating';
// import { FormsModule } from '@angular/forms';
// import { InputNumberModule } from 'primeng/inputnumber';
// import { ConfirmationService, MessageService } from 'primeng/api';
// import { PrimeNGConfig } from 'primeng/api';
// import { ApiService } from './services/api.service';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [
//     TableModule,
//     DialogModule,
//     RippleModule,
//     ButtonModule,
//     ToastModule,
//     ToolbarModule,
//     ConfirmDialogModule,
//     InputTextModule,
//     InputTextareaModule,
//     CommonModule,
//     FileUploadModule,
//     DropdownModule,
//     TagModule,
//     RadioButtonModule,
//     RatingModule,
//     InputTextModule,
//     FormsModule,
//     InputNumberModule,
//   ],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.scss',
//   providers: [MessageService, ConfirmationService],
// })
// export class AppComponent implements OnInit {
//   BookDialog: boolean = false;
//   book: any;

//   constructor(
//     private primengConfig: PrimeNGConfig,
//     private api: ApiService
//   ) {}

//   ngOnInit() {
//     this.primengConfig.ripple = true;

//     this.api.getDocuments().subscribe(
//       (documents: any) => {
//         this.allDocuments = documents;
//       },
//       (error) => {
//         console.error('Error fetching documents:', error);
//       }
//     );
//   }

//   allDocuments: any = [];
//   selectedDocument: any;

//   title = 'library_managment';

//   openNew() {
//     this.BookDialog = true;
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ApiService } from './services/api.service';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [MultiSelectModule, CalendarModule, TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule, InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule, FormsModule, InputNumberModule],
  providers: [MessageService, ConfirmationService, ApiService],
  styles: [

  ]
})
export class AppComponent implements OnInit {
  documentDialog: boolean = false;

  documents!: any[];

  document!: any;

  selectedDocuments!: any[] | null;

  submitted: boolean = false;

  statuses!: any[];

  exemplairesOptions!: any[];

  periodiciteOptions!: any[];

  constructor(private documentService: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.documentService.getDocuments().subscribe((data: any) => this.documents = data);

    this.statuses = [true, false];
    this.exemplairesOptions = ["EX1", "EX2", "EX3", "EX4", "EX5"]
    this.periodiciteOptions = ["MENSUEL", "HEBDOMADAIRE", "JOURNALIER"]
  }

  openNew() {
    this.document = {};
    this.submitted = false;
    this.documentDialog = true;
  }


  filterGlobal(event: any, dt: any) {
    try {
      const inputValue = event.target.value;
      dt.filterGlobal(inputValue, 'contains');
    } catch (e) {
      console.log(e)
    }
  }

  deleteSelectedDocuments() {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer les documents sélectionnés ?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        for (let doc of this.selectedDocuments!) {
          this.documentService.deleteDocument(doc._id).subscribe();
        }
        this.documents = this.documents.filter((val) => !this.selectedDocuments?.includes(val));
        this.selectedDocuments = null;
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Documents supprimés!', life: 3000 });
      }
    });
  }

  editDocument(document: any) {
    this.document = { ...document };
    this.documentDialog = true;
  }

  deleteDocument(document: any) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer ce document ??',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.documentService.deleteDocument(document._id).subscribe();
        this.documents = this.documents.filter((val) => val._id !== document._id);
        this.document = {};
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Document supprimé!', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.documentDialog = false;
    this.submitted = false;
  }

  saveDocument() {
    this.submitted = true;

    if (this.document._id) {
      this.documentService.updateDocument(this.document).subscribe();
      this.documents[this.findIndexById(this.document._id)] = this.document;
      this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Document mis à jour!', life: 3000 });
    } else {
      this.documentService.createDocument(this.document).subscribe();
      this.documents.push(this.document);
      this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Document créé!', life: 3000 });
    }

    this.documents = [...this.documents];
    this.documentDialog = false;
    this.document = {};

  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.documents.length; i++) {
      if (this.documents[i]._id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  export(){
    this.documentService.export().then(() => console.log("downloaded database succefully"));
  }

  getDisponibility(status: boolean) {
    switch (status) {
      case true:
        return 'success';
      case false:
        return 'danger';
      default:
        return 'success';
    }
  }
}