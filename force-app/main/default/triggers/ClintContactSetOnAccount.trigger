/* 4. Create a field on Account Named (Client Contact lookup to Contact). Once an Account is inserted a Contact will create with the name of the Account and that Contact will be the Client Contact on the Account. - Done
*/
trigger ClintContactSetOnAccount on Account (before insert) {
 
    for(Account a : Trigger.new) {
        Contact cnt = new Contact(LastName =  a.name , AccountId = a.id);
        Insert cnt;

        If (cnt != null) 
        { 
            a.Client_Contact__c = cnt.id;
        } 
    }   
    
}