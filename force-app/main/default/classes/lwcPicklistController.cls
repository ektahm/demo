public with sharing class lwcPicklistController {
    
    //fetch picklist values from custom object in lwc
    @AuraEnabled(cacheable=true)
    public static List < customValueWrapper > pickListValueDynamically(sObject customObjInfo, string selectPicklistApi) {
       Schema.DescribeSObjectResult objDescribe = customObjInfo.getSObjectType().getDescribe();     
       map < String, Schema.SObjectField > customFieldMap = objDescribe.fields.getMap();      
       list < Schema.PicklistEntry > custPickValues = customFieldMap.get(selectPicklistApi).getDescribe().getPickListValues();
       list < customValueWrapper > customObjWrapper = new list < customValueWrapper > ();
       for (Schema.PicklistEntry myCustPick: custPickValues) {
         customValueWrapper selectOptionValueWrapper = new customValueWrapper();
            selectOptionValueWrapper.custFldlabel = myCustPick.getLabel();
            selectOptionValueWrapper.custFldvalue = myCustPick.getValue();
           customObjWrapper.add(selectOptionValueWrapper);
       }
      
       return customObjWrapper;
 
     }
     // wrapper class 
       public with sharing class customValueWrapper {
         @auraEnabled public string custFldlabel {get;set;}
         @auraEnabled public string custFldvalue {get;set;}
       }

    @AuraEnabled(cacheable=true)
    public static List<SelectOption> getIndustry()
    {
        List<SelectOption> options = new List<SelectOption>();
        Schema.DescribeFieldResult fieldResult = Account.Industry.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        for( Schema.PicklistEntry f : ple)
        {
          SelectOption selectOptionValueWrapper = new SelectOption();
          selectOptionValueWrapper.custFldlabel = f.getLabel();
          selectOptionValueWrapper.custFldvalue = f.getValue();
          options.add(selectOptionValueWrapper);
          
        }
        system.debug(options);
        return options;
    }
    public with sharing class SelectOption {
      @auraEnabled public string custFldlabel {get;set;}
      @auraEnabled public string custFldvalue {get;set;}
    }
}