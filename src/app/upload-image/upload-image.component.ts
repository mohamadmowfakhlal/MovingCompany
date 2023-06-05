import { UploadFilesService } from 'src/services/upload-files.service';
import { Component, Input,Output, OnInit,EventEmitter } from '@angular/core';

import { HttpEventType, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.sass']
})

export class UploadImageComponent implements OnInit {

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  @Output() fileName: EventEmitter<String> = new EventEmitter();
 
  fileInfos?: Observable<any>;

  constructor(private uploadService: UploadFilesService) { }
  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);  
      if (file) {
        this.currentFile = file;
        var fileExt = file.name.split('.').pop();
        var newFileName;
         this.fileName.emit(newFileName);
        this.uploadService.upload(this.currentFile,newFileName).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;
  
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
  
            this.currentFile = undefined;
          });
      }
  
      this.selectedFiles = undefined;
    }
  }
}
