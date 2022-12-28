public class ParkLocator {
    public Static String[] Country(String Cntry) {
        ParkService.ParksImplPort parksvc = new ParkService.ParksImplPort();
        return parksvc.byCountry(Cntry);
    }
}
