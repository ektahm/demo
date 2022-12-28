/* 2. Once an Account is inserted an email should go to the System Admin user with specified text below. An account has been created and the name is “Test Name”. - Done
*/
trigger SendEmailAfterCreateAccount on Account (After insert) {

  
 /* for (Account a : Trigger.new) {

    Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
      

    String[] toAddresses = new String[] {UserInfo.getUserEmail()};
    mail.setToAddresses(toAddresses);
    mail.setSubject('Create New Account'); 
    String body = 'Dear ' + a.Name + ', '; 
    body += 'Account has been created and the name is '+a.Name+'.';
    mail.setPlainTextBody(body);
      
    Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
   
  }*/


}