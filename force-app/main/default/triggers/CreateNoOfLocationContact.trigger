/* 10. Creates the number of contacts which are equal to the number which we will enter in the Number of Locations field on the Account Object. -  Done
*/
trigger CreateNoOfLocationContact on Account (after insert) {
  /*  for(Account a :  Trigger.new){
        If(a.NumberofLocations__c != null){
            for(integer i=0 ; i< a.NumberofLocations__c ; i++ ){
                   Contact cnt = new contact(LastName = 'Sample '+i , AccountId = a.id);
                   insert  cnt; 
            }
        }
    }*/

}