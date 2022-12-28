trigger DeleteAccoutTrigger on Account (before Delete) {
    set<id> setid = new set<id>();
    for(Account a : Trigger.old){
        setid.add(a.id);
    }
    list<Contact> cnt = [select id,LastName from Contact where Accountid IN : setid];
    If(cnt.size() > 0) {
        for(Account a : Trigger.old){
            a.addError('Deletion Cant allow.Contact is already exist with this account id');
        }
    }
}