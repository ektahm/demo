trigger ContactDateUpdate on Account (before update , after update) {
    set<id> setid = new Set<id>();
    for(Account a : Trigger.new) {
        if (a.active__c == 'Yes') {
             setid.add(a.id);
        }
    }
    List<Contact> ContactList = [select id , AccountId from contact where AccountId IN : setid];
    For(contact c : ContactList)
    {
        c.Active_Date__c = system.today();
        Update c;
    }  
}