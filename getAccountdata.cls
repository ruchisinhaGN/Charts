public with sharing class LeadGraphController {
  @AuraEnabled(cacheable = true)

        public static Map < String, Decimal > getAccountdata(String searchKey ,String status ) {
           
            String resolvedField1 = searchKey;

            String query ='Select Count(Owner.Id) leadCount,  Owner.Name Name from ' + resolvedField1 + '   where Status =  \'close\'   GROUP BY  Status, Owner.Name';
        
          Map < String, Decimal > wrapp = new Map < String, Decimal > ();

       for (AggregateResult ar: Database.query(query)) {
            wrapp.put(String.valueOf(ar.get('Name')), (Decimal) ar.get('leadCount'));

        }
        System.debug( 'ffffffffffff' +wrapp);
        System.debug(status );
        return wrapp;
      
        }
    }



