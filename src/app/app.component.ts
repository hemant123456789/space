import { Component , OnInit } from '@angular/core';
import { RemoteApiService } from './services/remote-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'space';
  yearsArray = [
    {year:2006,selected:false},
    {year:2007,selected:false},
    {year:2008,selected:false},
    {year:2009,selected:false},
    {year:2010,selected:false},
    {year:2011,selected:false},
    {year:2012,selected:false},
    {year:2013,selected:false},
    {year:2014,selected:false},
    {year:2015,selected:false},
    {year:2016,selected:false},
    {year:2017,selected:false},
    {year:2018,selected:false},
    {year:2019,selected:false},
    {year:2020,selected:false}
    ];

  filterObject :{[key:string] :any} = {
    
  }
  spaceData : any[] = [];


  launchArray = [
    {
      tag: 'Successful Launch', btnArr: [
        {key :'launch_success', lbl: true,selected:false },
        {key:'launch_success',lbl: false,selected:false }
      ]
    },
    {
      tag: 'Successful Landing', btnArr: [
        { key:'land_success',lbl: true,selected:false },
        { key:'land_success',lbl: false,selected:false }
      ]
    }
  ];
  constructor(private remoteService:RemoteApiService){}
  ngOnInit() {
  
    this.filterObject={};
    this.getAllSpaceData();

  }
  getAllSpaceData() {
   
    this.launchArray.forEach(value => {
      value.btnArr.forEach(item => {
        if(item.selected) {
          this.filterObject[item.key] = item.lbl;
        }

      })
    });
    this.yearsArray.forEach(year => {
      if(year.selected) {
        this.filterObject[`launch_year`] = year.year;
      }
    });
    let urlString='';
    console.log(this.filterObject)
    Object.keys(this.filterObject).forEach((key,index) => {
    
      urlString +='&'+key+'='+this.filterObject[key];

     
    })
    this.remoteService.getData(urlString).subscribe(res => {    
      this.spaceData=res as any;
      console.log(res)
    });
  }
  clickLaunch(i,j) {
    this.launchArray[i].btnArr.forEach(item => {
      item.selected=false;
    })
      
   
    this.launchArray[i].btnArr[j].selected=true;
    this.getAllSpaceData();
  }
  clickYear(index) {
    this.yearsArray.forEach(val => val.selected=false);
   this.yearsArray[index].selected=true;
   this.getAllSpaceData();
  }

}
