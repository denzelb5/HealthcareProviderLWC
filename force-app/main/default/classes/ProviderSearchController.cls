public with sharing class ProviderSearchController {
    @AuraEnabled(cacheable=true)
    public static List<Provider__c> searchProviders(String searchTerm) {
        List<Provider__c> providers = new List<Provider__c>();
        if (String.isNotBlank(searchTerm)) {
            List<List<SObject>> searchResults = [
                FIND :searchTerm
                RETURNING
                    Provider__c(
                        Id,
                        First_Name__c,
                        Last_Name__c,
                        Gender__c,
                        Spec__c,
                        NpiNumber__c,
                        Type__c
                        ORDER BY Last_Name__c
                    )
            ];
            providers = searchResults[0];
        }
        return providers;
    }
}
