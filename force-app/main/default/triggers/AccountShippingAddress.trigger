/* 1. Write a trigger on Account, when an account is inserted, automatically account billing address should populate into the account shipping address.*/
trigger AccountShippingAddress on Account (Before insert) {
    for(Account a : Trigger.new) {
          a.BillingPostalCode = a.ShippingPostalCode;
          a.BillingCountry    = a.ShippingCountry;
          a.BillingCity       = a.ShippingCity;
          a.BillingState      = a.ShippingState;
          a.BillingStreet     = a.ShippingStreet;
    }
}