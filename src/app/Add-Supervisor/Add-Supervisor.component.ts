import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CallApiService } from '../core/call-api.service';
import { HandleErrorService } from '../core/handle-error.service';
import { ErrorsService } from '../error.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-Add-Supervisor',
  templateUrl: './Add-Supervisor.component.html',
  styleUrls: ['./Add-Supervisor.component.css']
})
export class AddSupervisorComponent implements OnInit {
  displayedColumns: string[] = [
    'srNo',
    'supervisordetail',
    'boothname',
    'action',
  ];
  add = {
    SubElectionId: '',
    ElectionName: '',
  };
  isBothListArray = [
    { id: 0, name: 'male' },
    { id: 1, name: 'Female' },
  ];
  isSubElectionArray = [
    { id: 0, name: 'Yes' },
    { id: 1, name: 'No' },
  ];
  addSupervisorForm!: FormGroup;
  dataSource: any[] = [];
  filterForm!: FormGroup;
  addForm!:FormGroup;
  addSupervisorArray = new Array();
  editFlag: boolean = false;
  pageNumber: number = 0;
  pageSize: number = 7;
  totalCount: any;
  client= new Array()
  // pageCount!:number;
  pageEvent!: PageEvent;
  currentPage: number = 0;

  constructor(
    private fb: FormBuilder,
    private service: CallApiService,
    public error: ErrorsService,
    private snack: MatSnackBar,
    private handleErrorSer: HandleErrorService
  ) {}

  ngOnInit() {
    this.error.handelError(220);
    this.defaulForm();
    this.displayData();
    this.getClient();

  }

  defaulForm() {
    this.addSupervisorForm = this.fb.group({
      fname: ['', [Validators.required]],
      mname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      selectclient:['',[Validators.required]],
      IsAsemblyBoothListApplicable: ['0', [Validators.required]],
      electiontype: ['', [Validators.required]],
      subselection: ['', [Validators.required]],
      IsSubElectionApplicable: ['1', [Validators.required]],
    });
    //Dynamically Load Form Group
    this.filterForm = this.fb.group({
      subselection: ['', [Validators.required]],
      searchtext: [''],
      electiontype: ['', [Validators.required]],
    });

  }
  get f() {
    return this.addSupervisorForm.controls;
  }
  // ------------------------------------------------------ display Table ---------------------------------------------------------- //

  displayData() {
    this.service.setHttp(
      'get',
      'VoterCRM/GetCallCenterUser?ClientId=0&UserId=1&ElectionId=0&ConstituencyId=0&BoothId=0&Search=&pageno=1&pagesize=10',false,false,false,'baseURL'
    );
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200') {
          this.dataSource = res.responseData;
          this.dataSource = res.responseData1;
          this.totalCount = res.responseData1.pageCount;
          console.log(this.totalCount);

        }else{
          this.dataSource=[];
        }
      },
    });
  }

  // ------------------------------------------------------ Election ------------------------------------------------------------ //
  getClient() {
    this.service.setHttp(
      'get',
      'Filter/GetElectionMaster?UserId=1&ClientId=67',
      false,
      false,
      false,
      'baseURL'
    );
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200' && res.responseData.length) {
          this.client = res.responseData;
        }
      },
    });
  }


  // ------------------------------------------------------ Submit Record -------------------------------------------------------------- //
  onSubmit() {
    alert();

  }
  // ------------------------------------------------------ Edit Record from Form---------------------------------------------------------- //
  onEdit() {

  }

  // ------------------------------------------------------ Delete Record from Form---------------------------------------------------------- //
  onDelete(Id: number) {
    // let formData = this.electionForm.value;
    this.service.setHttp(
      'get',
      'Service.asmx/Delete_Election?ElectionId=' + Id + '&CreatedBy=1',
      false,
      false,
      false,
      'baseURL'
    );
    this.service.getHttp().subscribe({
      next: (res: any) => {
        this.snack.open(res.statusMsg, 'Ok', { duration: 1000 });
        this.displayData();
      },
    });
  }
  //--------------------------------------------------------------------------Paginator--------------------------------------------------------------------------//
  pageChanged(event: any) {
    this.currentPage = event.pageIndex;
    this.displayData();
    this.currentPage=0;
  }
  // ------------------------------------------------------ Clear Form except self one---------------------------------------------------------- //

  clearDivDistForm() {
    this.addSupervisorForm.reset();
    // this.addForm.reset();
    this.editFlag = false;
  }
  //---------------------------------------------------------------------Space---------------------------------------------------------------------------//
  space(e: any) {
    console.log(e);
    if (e.charCode === 32) {
      e.preventDefault();
    }
  }
  letterOnly(event: any): Boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
      return false;
    }
    return true;
  }
  //----------------------------------------------------------------------Add-------------------------------------------------------------------------

  //-------------------------------------------------------------------------Delete------------------------------------------------------------
  OnDelete(index: any) {
    if (confirm('Are you sure you want to delete this?')) {
      // this.addnewArray.splice(index - 1);
    }
  }
  //------------
}
