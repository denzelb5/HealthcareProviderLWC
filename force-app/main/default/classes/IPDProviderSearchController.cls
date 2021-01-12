public with sharing class IPDProviderSearchController {
    @AuraEnabled(cacheable=true) 
    public static List<IPD_Provider__c> searchIPDProviders(String ipdSearchTerm) {
        List<IPD_Provider__c> ipdProviders = new List<IPD_Provider__c>();
        if (String.isNotBlank(ipdSearchTerm)) {
            List<List<SObject>> searchResults = [
                FIND :ipdSearchTerm
                RETURNING
                    IPD_Provider__c(
                        Id, 
                        First_Name__c,
                        Last_Name__c,
                        Gender__c,
                        S__c,
                        NPI_Number__c,
                        Type__c
                        ORDER BY Last_Name__c
                    )
            ];
            ipdProviders = searchResults[0];
        }
        return ipdProviders;
    }
}
