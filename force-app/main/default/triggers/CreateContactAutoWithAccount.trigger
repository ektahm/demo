/* 8. Whenever New Account Record is created then needs to create associated Contact Record automatically. - Done */
trigger CreateContactAutoWithAccount on Account (after insert) {
    
    List<Contact> cntlist = new List<Contact>();
    for(Account a : Trigger.new) {
        Contact cnt = new Contact();
        cnt.LastName = a.Name;
        cnt.AccountId = a.id;
        cntlist.add(cnt);
    }    
    Insert cntlist;
        
    /*If (cntlist.Size() > 0) 
    { 
       System.debug('Contact Successfully Created');
    }  */
       
}