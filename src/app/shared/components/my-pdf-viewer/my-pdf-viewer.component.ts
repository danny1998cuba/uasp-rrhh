import { Component, Input, OnInit } from '@angular/core';
import { faAngleLeft, faAngleRight, faDownload } from '@fortawesome/free-solid-svg-icons';
import { PDFSource } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './my-pdf-viewer.component.html',
  styleUrls: ['./my-pdf-viewer.component.css']
})
export class MyPdfViewerComponent implements OnInit {

  @Input() src: string = '';
  @Input() downloadFileName: string = 'document.pdf'

  faDown = faDownload; faNext = faAngleRight; faPrevious = faAngleLeft
  page = 1
  totalPages: number = 0;
  isLoaded: boolean = false;
  title: string = 'document';

  constructor() {
  }

  ngOnInit(): void {
    this.title = this.downloadFileName.replace('.pdf', '')
  }

  increasePage(inc: boolean) {
    if (inc) {
      this.page++
    } else {
      if (this.page > 1)
        this.page--
    }
  }

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }

  download() {
    var a = document.createElement('a')
    a.href = this.src
    a.target = '_blank'
    a.download = this.downloadFileName
    document.body.appendChild(a)
    a.click()
  }

}
