public  class AddPrimaryContact implements Queueable {
    private Contact con;
    private string state;
    public AddPrimaryContact(Contact con , string state) {
        this.con = con;
        this.state = state;
    }
    public void execute(QueueableContext context) {
        list<Account> acct = [select id, name , (select id,firstname , lastname from Contacts ) 
                              from Account where BillingState =:state limit 200];

        list<contact> primarycontact = new list<contact>();
        for (Account ac : acct) {
            Contact c = con.clone();
            c.AccountId = ac.id;
            primarycontact.add(c);
        }                      
        If (primarycontact.Size() > 0){
            insert primarycontact;
        }
    }
}