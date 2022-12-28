@isTest
public  class AddPrimaryContactTest {
    static testmethod void testQueueable(){
        list<Account> acct = new list<Account>();

        for(integer i=0;i<50;i++){
            acct.add(new Account(Name =  'Account '+i,BillingState = 'CA'));
        }
        for(integer j=0;j<50;j++){
            acct.add(new Account(Name =  'Account '+j,BillingState = 'NY'));
        }
        insert  acct;

        Contact cnt = new Contact(FirstName = 'ekta', LastName = 'quetest');
        insert cnt;
       
        AddPrimaryContact add = new AddPrimaryContact(cnt,'CA');

        Test.StartTest();
        System.enqueueJob(add);
        Test.StopTest();

        System.assertEquals(50, [select count() from Contact where AccountId in (select id from Account where BillingState = 'CA')]);
    }
    
}