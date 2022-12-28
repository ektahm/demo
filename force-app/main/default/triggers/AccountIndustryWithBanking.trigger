/* 9. When ever the Account is created with Industry as Banking then create a contact for account, Contact Lastname as Account name and contact phone as account phone. - Done
*/
trigger AccountIndustryWithBanking on Account (After insert) {
    List<Contact> cntlist = new List<Contact>();
    for(Account a : Trigger.new) {
        If(a.Industry == 'Banking'){
            Contact cnt = new Contact();
            cnt.LastName = a.Name;
            cnt.AccountId = a.id;
            cnt.Phone = a.Phone;
            cntlist.add(cnt);
        }    
    }    
    Insert cntlist;
}