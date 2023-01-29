package Classes;

import Observers.Manager;
import Observers.Observer;

public class Bank implements Observer{
    public Manager events;
    private double inflation;
    private int selledItems;
    //stały przychód banku  równa się inflacja razy liczba sprzedanych/kupionych rzeczy

    public Bank(int inflation) {
        this.events = new Manager("inflationChange");
        this.selledItems = 0;
    }

    public void setInflation(double inflation) {
        this.inflation = inflation;
        events.notifyObservers("inflationChange", inflation);
    }

    @Override
    public void update(String event, double data) {
        if (event == "bankMonitoring"){
            this.selledItems = (int)data;
        }  
    }

}
