import {LightningElement,api,wire,track} from 'lwc';
import {loadScript} from 'lightning/platformResourceLoader';
import ChartJS from '@salesforce/resourceUrl/ChartJs';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import getAccountdata from '@salesforce/apex/LeadGraphController.getAccountdata';
export default class Test extends LightningElement {
    @api heading;
    @api Object;
    @track dataSet;
    contacts;
   
    
    searchKey = '';
   // @wire(getAccountdata, { searchKey: '$Object' })
   // contacts;
  
    

    @wire(getcaseStatus, { searchKey: '$Object' }) wiredLeads(result) {
        if (result.data) {
            console.log('Chart',result.data);
            this.dataSet = result.data;
         
            console.log(result.data);
            this.Initializechartjs();
        } else if (result.error) {

        }
    }
    @api chartjsInitialized = false;
    renderedCallback() {
        if (this.chartjsInitialized) {
            return;
        }
        this.chartjsInitialized = true;

        Promise.all([
                loadScript(this, ChartJS)
            ])
            .then(() => {
                //this.Initializechartjs();
            })
            .catch(error => {
                console.log(error.message)
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error loading chartJs',
                        message: error.message,
                        variant: 'error'
                    })
                );
            });
    }

    Initializechartjs() {
        console.log("loaded");
        var piechart;
        var ctx = this.template.querySelector(".pie-chart").getContext('2d');
            
        piechart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: Object.keys(this.dataSet),
                datasets: [{
                    label: 'count',
                    data: Object.values(this.dataSet),
                    backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"]

                }]
            }
        });
    }
  
       
    


}
