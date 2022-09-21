import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom } from 'rxjs';
import { SigeliteService } from 'src/app/data/services';

@Component({
  selector: 'app-omei',
  templateUrl: './omei.component.html',
  styleUrls: ['./omei.component.css']
})
export class OmeiComponent {
  isLoading5202 = false
  isLoading5205 = false

  file: string = ''
  downloadName: string = ''
  faDown = faDownload

  observ5202: string = ''
  observ5205: string = ''
  fechaProces: Date;

  constructor(
    private service: SigeliteService,
    private snackBar: MatSnackBar
  ) {
    this.fechaProces = new Date()
    this.fechaProces.setMonth(this.fechaProces.getMonth() - 1);
    this.fechaProces.setDate(28)
  }

  sendMsg(msg: string) {
    this.snackBar.open(msg, '', { duration: 3000, horizontalPosition: 'end' })
  }

  async load_F5202() {
    this.isLoading5202 = true
    await firstValueFrom(this.service.F5202(this.observ5202 == '' ? undefined : this.observ5202)).then(
      r => {
        if (!r.error) {
          this.file = URL.createObjectURL(r.data)

          this.downloadName = "F520207_2_"
            + new DatePipe('es-ES').transform(this.fechaProces, "yyyy-MM-dd")
            + '_08427.xml'

          this.download()
          this.observ5202 = ''
        } else {
          this.sendMsg("Error")
        }
      }
    )
    this.isLoading5202 = false
  }

  async load_F5205() {
    this.isLoading5205 = true
    await firstValueFrom(this.service.F5205(this.observ5205 == '' ? undefined : this.observ5205)).then(
      r => {
        if (!r.error) {
          this.file = URL.createObjectURL(r.data)

          this.downloadName = "F520502_2_"
            + new DatePipe('es-ES').transform(this.fechaProces, "yyyy-MM-dd")
            + '_08427.xml'

          this.download()
          this.observ5205 = ''
        } else {
          this.sendMsg("Error")
        }
      }
    )
    this.isLoading5205 = false
  }

  download() {
    var a = document.createElement('a')
    a.href = this.file
    a.target = '_blank'
    a.download = this.downloadName
    document.body.appendChild(a)
    a.click()
  }

}
