public with sharing class carLocationController {
    @AuraEnabled
   public static List<Car__c> getCarLocation(String carId){
             
    return  [SELECT Id,
            Geolocation__latitude__s, Geolocation__longitude__s
            FROM Car__c 
            WHERE Id=:carId];
    }
}
