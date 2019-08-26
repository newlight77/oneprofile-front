---
layout: post
title:  "Design patterns by example"
date:   2018-08-27 12:18:01 +0200
categories: 
    - design pattern 
tags: 
    - java
    - spring
    - design patterns
author: newlight77
---

Design patterns are considered as good practices as they are generic, repeatable and re-usable solutions in software design. They aims to describe how problems could be solved in a commonly known pattern so it will easy the understanding.

## Singleton

This is the most used pattern. The method getInstance() assures that only one instance of this class is created at runtime.
Singleton is not thread safe, not if you don't make it synchronized, so it can be instantiate more than once.

SingletonSample.java

```java
public class SingletonSample {
   private static SingletonSample instance = null;

   private SingletonSample() {
   }

   public static SingletonSample getInstance() {
      if(instance == null) {
         instance = new SingletonSample();
      }
      return instance;
   }
}
```

## Initialization on Demand Holder

This is much the Singleton, but the instance is created on demand.
It has has critical advantage over the simple Singleton : It is thread safe.

SingletonSample.java

```java
public class SingletonSample {
    private SingletonSample() {
    }

    public static SingletonSample getInstance() {
        return SingletonSampleHolder.INSTANCE;
    }

    private static class SingletonSampleHolder {
        private static final SingletonSample INSTANCE = new SingletonSample();
    }
}
```

## Fluent Builder

Objects often requires many parameters to be created properly.
Either using the constructor or using the setters will make our code hard to understand.

Fluent builder code will help to have cleaner code.

Product.java

```java
public class Product {
    private String name;
    private String description;

    private Product() {
    }

    public static Builder builder() {
        return new Builder();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public static final class Builder {
        private String name;
        private String description;
        private Product object;

        public Builder() {
          this.object = new Product();
        }

        public Builder name(String name) {
            this.object.name = name;
            return this;
        }

        public Builder description(String description) {
            this.object.description = description;
            return this;
        }

        public Product build() {
            return this.object;
        }
    }
}
```

Easier to read on usage :

```java
Product product = Product.newProduct()
                      .name("oneprofile'")
                      .description("the best pattern'")
                      .build();
```

## Step builder

Email.java

```java
public class Email {  
    private EmailAddress from;
    private List<EmailAddress> to;
    private List<EmailAddress> cc;
    private List<EmailAddress> bcc;
    private Subject subject;
    private Content content;

    public static FromStep builder() {
        return new Builder();
    }

    public interface FromStep {
        ToStep from(EmailAddress from);
    }

    public interface ToStep {
        SubjectStep to(EmailAddress... from);
    }

    public interface SubjectStep {
        ContentStep subject(Subject subject);
    }

    public interface ContentStep {
        Build content(Content content);
    }

    public interface Build {
        Email build();
        Build cc(EmailAddress... cc);
        Build bcc(EmailAddress... bcc);
    }

    public static class Builder implements FromStep, ToStep, SubjectStep, ContentStep, Build {
        private EmailAddress from;
        private List<EmailAddress> to;
        private List<EmailAddress> cc;
        private List<EmailAddress> bcc;
        private Subject subject;
        private Content content;

        @Override
        public Email build() {
            return new Email(this);
        }
        @Override
        public Build cc(EmailAddress... cc) {
            Objects.requireNonNull(cc);
            this.cc = new ArrayList<EmailAddress>(Arrays.asList(cc));
            return this;
        }
        @Override
        public Build bcc(EmailAddress... bcc) {
            Objects.requireNonNull(bcc);
            this.bcc = new ArrayList<EmailAddress>(Arrays.asList(bcc));
            return this;
        }
        @Override
        public Build content(Content content) {
            Objects.requireNonNull(content);
            this.content = content;
            return this;
        }
        @Override
        public ContentStep subject(Subject subject) {
            Objects.requireNonNull(subject);
            this.subject = subject;
            return this;
        }
        @Override
        public SubjectStep to(EmailAddress... to) {
            Objects.requireNonNull(to);
            this.to = new ArrayList<EmailAddress>(Arrays.asList(to));
            return this;
        }
        @Override
        public ToStep from(EmailAddress from) {
            Objects.requireNonNull(from);
            this.from = from;
            return this;
        }
    }

    private Email(Builder builder) {
        this.from = builder.from;
        this.to = builder.to;
        this.cc = builder.cc;
        this.bcc = builder.bcc;
        this.subject = builder.subject;
        this.content = builder.content;
    }

    public EmailAddress getFrom() {
        return from;
    }

    public List<EmailAddress> getTo() {
        return to;
    }

    public List<EmailAddress> getCc() {
        return cc;
    }

    public List<EmailAddress> getBcc() {
        return bcc;
    }

    public Subject getSubject() {
        return subject;
    }

    public Content getContent() {
        return content;
    }
}
```

Usage:

```java
Email email =  
Email.builder().from(EmailAddress.of("Microservices Weekly <mw@microservicesweekly.com>"))  
    .to(EmailAddress.of("svlada@gmail.com"))
    .subject(Subject.of("Subject"))
    .content(Content.of("Test email"))
    .build();
```

## Command pattern

Command pattern is mostly used to invoke an operation to be performed on the callee side. It encapsulates parameters within a request object.

Order.java

```java
public interface Order {
   void execute();
}
```

Stock.java

```java
public class Stock {

   private String name = "ABC";
   private int quantity = 10;

   public void buy(){
      System.out.println("Stock [ Name: "+name+",
         Quantity: " + quantity +" ] bought");
   }
   public void sell(){
      System.out.println("Stock [ Name: "+name+",
         Quantity: " + quantity +" ] sold");
   }
}
```

BuyStock.java

```java
public class BuyStock implements Order {
   private Stock abcStock;

   public BuyStock(Stock abcStock){
      this.abcStock = abcStock;
   }

   public void execute() {
      abcStock.buy();
   }
}
```

SellStock.java

```java
public class SellStock implements Order {
   private Stock abcStock;

   public SellStock(Stock abcStock){
      this.abcStock = abcStock;
   }

   public void execute() {
      abcStock.sell();
   }
}
```

Broker.java

```java
import java.util.ArrayList;
import java.util.List;

 public class Broker {
   private List<Order> orderList = new ArrayList<Order>();

   public void takeOrder(Order order){
      orderList.add(order);		
   }

   public void placeOrders(){

      for (Order order : orderList) {
         order.execute();
      }
      orderList.clear();
   }
}
```

**Usage:**

Demo.java

```java
public class Demo {
   public static void main(String[] args) {
      Stock abcStock = new Stock();

      BuyStock buyStockOrder = new BuyStock(abcStock);
      SellStock sellStockOrder = new SellStock(abcStock);

      Broker broker = new Broker();
      broker.takeOrder(buyStockOrder);
      broker.takeOrder(sellStockOrder);

      broker.placeOrders();
   }
}
```

## Chain of responsability (need review)

The chain of responsability pattern could be very useful when we need to execute many operations in some order.

Command.java

```java
public interface Command<T>{
    boolean execute(T context);
}
```

SendEmailCommand.java

```java
public class SendEmailCommand implements Command<Map<String, Object>>{
    public boolean execute(Map<String, Object> context){
        if (context.get("email")) {
          System.out.println("doing something in here");  
        }
        return false;
    }
}
```

SendSmsCommand.java

```java
public class SendSmsCommand implements Command<Map<String, Object>>{
    public boolean execute(Map<String, Object> context){
      if (context.get("sms")) {
        System.out.println("doing something in here");  
      }
        return true;
    }
}
```

Chain.java

```java
public class Chain {
    public List<Command> commands;

    public Chain(Command... commands){
        this.commands = Arrays.asList(commands);
    }

    public void start(Object context){
        for(Command command : commands){
            boolean shouldStop = command.execute(context);
            if(shouldStop){
                return;
            }
        }
    }
}
```

**Usage :**

```java
Chain chain = new Chain(new SendEmailCommand(), new SendSmsCommand());
Map<String, Object> context = new HashMap<>();
context.put("sms", true);
context.put("sms.number", "0655555555");
context.put("sms.message", "some message");
context.put("email", true);
context.put("email.recipient", "newlight77@gmail.com");
context.put("email", "some message");
chain.start(context);
```

## State pattern

The state pattern is a simple pattern that allow to alter an object's internal state and behavior.

Radio.java

```java
public class Radio {
    private boolean on;
    private RadioState state;

    public Radio(RadioState state){
        this.state = state;
    }

    public void execute(){
        state.execute(this);
    }

    public void setState(RadioState state){
        this.state = state;
    }

    public void setOn(boolean on){
        this.on = on;
    }

    public boolean isOn(){
        return on;
    }

    public boolean isOff(){
        return !on;
    }
}
```

RadioState.java

```java
public interface RadioState {
    void execute(Radio radio);
}
```

OnRadioState.java

```java
public class OnRadioState implements RadioState {
    public void execute(Radio radio){
        //throws exception if radio is already on
        radio.setOn(true);
    }
}
```

OffRadioState.java

```java
public class OffRadioState implements RadioState {
    public void execute(Radio radio){
        //throws exception if radio is already off
        radio.setOn(false);
    }
}
```

Usage:

```java
Radio radio = new Radio(new OffRadioState()); //initial status
radio.setState(new OnRadioState());
radio.execute(); //radio on
radio.setState(new OffRadioState());
radio.execute(); //radio off
```

## Reference

[Design patterns repository]: https://github.com/newlight77/design-patterns-sample
