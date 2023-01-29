package Observers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Manager{

    Map<String, List<Observer>> observers = new HashMap<>();
    private double inflation;

    public Manager(String... operations) {
        for (String operation : operations) {
            this.observers.put(operation, new ArrayList<>());
        }
    }

    public void subscribe(String eventType, Observer observer) {
        List<Observer> users = observers.get(eventType);
        users.add(observer);
    }

    public void unsubscribe(String eventType, Observer observer) {
        List<Observer> users = observers.get(eventType);
        users.remove(observer);
    }

    public void notifyObservers(String eventType, double data) {
        List<Observer> users = observers.get(eventType);
        for (Observer listener : users) {
            listener.update(eventType, data);
        }
    }

    
    
}
