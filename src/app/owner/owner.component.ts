import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OwnerService } from '../services/owner.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit,OnDestroy {

  owners:any[]=[];
  orgOwners:any[]=[];
  filterForm:FormGroup=new FormGroup({
    search:new FormControl("",[Validators.required])
  });
  ownerForm:FormGroup=new FormGroup({
    id:new FormControl("0",[Validators.required]),
    ownerName:new FormControl("",[Validators.required]),
    ownerPhone:new FormControl("",[Validators.required])
  });
  updateForm:FormGroup=new FormGroup({
    id:new FormControl("",[Validators.required]),
    ownerName:new FormControl("",[Validators.required]),
    ownerPhone:new FormControl("",[Validators.required])
  });
  constructor(private ownerServ:OwnerService) { }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  editOwner(owner:any){
    this.updateForm=new FormGroup({
      id:new FormControl(owner.id,[Validators.required]),
      ownerName:new FormControl(owner.ownerName,[Validators.required]),
      ownerPhone:new FormControl(owner.ownerPhone,[Validators.required])
    });
  }

  ngOnInit(): void {
    this.fetchOwners()
  }
  filterOwner(){
    this.owners=this.orgOwners.filter(res=>res.ownerName.includes(this.filterForm.controls["search"].value));
  }
  fetchOwners(){
    this.ownerServ.getOwners().subscribe(response=>{
      this.orgOwners=response;
      this.owners=response;
      console.log(this.owners)
    });
  }
  saveNewOwner(){
    this.ownerServ.newOwner(this.ownerForm.value).subscribe(response=>{
      this.fetchOwners();
      alert("Owner has been saved");
    },error=>{
      alert("Fail to save new owner");
    })
  };
  updateOwner(){
    this.ownerServ.updateOwner(this.updateForm.controls["id"].value,this.updateForm.value).subscribe(response=>{
      this.fetchOwners();
      alert("Owner has been update");
    },error=>{
      alert("Fail to update new owner");
    })
  };

  deleteOwner(owner:any){
    this.ownerServ.deleteOwner(owner.id).subscribe(response=>{
      this.fetchOwners();
      alert("Owner has been deleted");
    },error=>{
      this.fetchOwners();
      alert("Fail to delete new owner");
    })
  }
}
