package components;

import commands.Command;

public class Invoker {
    
    private Command command;

    public Invoker(Command command) {
        this.command = command;
    }

    public void applyDiscount(){
        command.execute();
    }

    public void clearDiscount(){
        command.undo();
    }
}
