import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/SERVICE/service.service'; // service link here
import swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component'

declare var $: any;

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-ViewAllSociety',
  templateUrl: './ViewAllSociety.component.html',
  styleUrls: ['./ViewAllSociety.component.css']
})
export class ViewAllSocietyComponent implements OnInit {

  public dataTable: DataTable;
  societies; response
  row

  constructor(private _router: Router, private _service: ServiceService) {}

  ngOnInit() {
      this.dataTable = {
          headerRow: [ 'Name', 'Position', 'Office', 'Age', 'Date', 'Actions' ],
          footerRow: [ 'Name', 'Position', 'Office', 'Age', 'Start Date', 'Actions' ],

          dataRows: [
              ['Airi Satou', 'Andrew Mike', 'Develop', '2013', '99,225', ''],
              ['Angelica Ramos', 'John Doe', 'Design', '2012', '89,241', 'btn-round'],
              ['Ashton Cox', 'Alex Mike', 'Design', '2010', '92,144', 'btn-simple'],
              ['Bradley Greer', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
              ['Brenden Wagner', 'Paul Dickens', 'Communication', '2015', '69,201', ''],
              ['Brielle Williamson', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
              ['Caesar Vance', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
              ['Cedric Kelly', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
              ['Charde Marshall', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
              ['Colleen Hurst', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
              ['Dai Rios', 'Andrew Mike', 'Develop', '2013', '99,225', ''],
              ['Doris Wilder', 'John Doe', 'Design', '2012', '89,241', 'btn-round'],
              ['Fiona Green', 'Alex Mike', 'Design', '2010', '92,144', 'btn-simple'],
              ['Garrett Winters', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
              ['Gavin Cortez', 'Paul Dickens', 'Communication', '2015', '69,201', ''],
              ['Gavin Joyce', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
              ['Gloria Little', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
              ['Haley Kennedy', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
              ['Herrod Chandler', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
              ['Hope Fuentes', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
              ['Howard Hatfield', 'Andrew Mike', 'Develop', '2013', '99,225', ''],
              ['Jena Gaines', 'John Doe', 'Design', '2012', '89,241', 'btn-round'],
              ['Jenette Caldwell', 'Alex Mike', 'Design', '2010', '92,144', 'btn-simple'],
              ['Jennifer Chang', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
              ['Martena Mccray', 'Paul Dickens', 'Communication', '2015', '69,201', ''],
              ['Michael Silva', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
              ['Michelle House', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
              ['Paul Byrd', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
              ['Prescott Bartlett', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
              ['Quinn Flynn', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
              ['Rhona Davidson', 'Andrew Mike', 'Develop', '2013', '99,225', ''],
              ['Shou Itou', 'John Doe', 'Design', '2012', '89,241', 'btn-round'],
              ['Sonya Frost', 'Alex Mike', 'Design', '2010', '92,144', 'btn-simple'],
              ['Suki Burks', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
              ['Tatyana Fitzpatrick', 'Paul Dickens', 'Communication', '2015', '69,201', ''],
              ['Tiger Nixon', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
              ['Timothy Mooney', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
              ['Unity Butler', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
              ['Vivian Harrell', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
              ['Yuri Berry', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round']
          ]
       };

       this._service.getSociety()
        .subscribe(res =>{
          this.response = res
          this.societies = this.response.response
          console.log(res)},
          err => console.log(err))

  }
  // Edit society
  editSociety(index, id) {
    this.row = index;
    localStorage.setItem('id', JSON.stringify(id));
    this._router.navigate(['/society/editsociety']);
  }

  // View society information 
  viewSociety(index, id) {
    this.row = index;
    console.log('Member ID: ' + id); 
    localStorage.setItem('id', JSON.stringify(id));
    this._router.navigate(['/society/societyinfomation']);   
  }

    
  // Delete a society
  deleteSociety(index, id) {
    this.row = index;
    console.log('Member ID: ' + id);
    swal({
      title: 'Delete This Society',
      text: "Are you sure?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      cancelButtonText: 'No, Do not Delete',
      confirmButtonText: 'Yes, Delete',
      buttonsStyling: false
    }).then((result) => {
      if (result.value) {/*
        this._service.removeMember(id)
          .subscribe(res => {
            console.log(res)
          }, err => console.log(err))*/
        swal(
          {
            title: 'Society Deleted',
            //text: 'Member Deleted',
            type: 'success',
            confirmButtonClass: "btn btn-success",
            buttonsStyling: false

          }).then((result) => window.location.reload())
      }
    })
  }


}
