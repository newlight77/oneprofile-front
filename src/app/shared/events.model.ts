export class Event {
    date: Date;
    duration: number;
    title = '';
    content = '';
    location = '';
    author = '';
}

export const UPCOMING_EVENTS: Array<Event> = [
    { date: new Date(2019, 8, 9, 14, 30), duration: 60, location: 'Paris', author: 'Kong To',
      title: 'Workshop : Angular from zero to production',
      // tslint:disable-next-line:max-line-length
      content: 'We will go through a a tutorial with example and learn Angular 8 from scratch. This tutorial is specially designed for newcomers, and it will help you to up and running with the latest version of Angular which is right now 8. You will learn Angular by example by building step by step an application.'
    },
    { date: new Date(2019, 8, 9, 14, 30), duration: 60, location: 'Paris', author: 'Kong To',
      title: 'Workshop : Begining with Ansible',
      // tslint:disable-next-line:max-line-length
      content: 'This workshop introduces a beginner in DevOps to basic fundamentals of Ansible with easy to do hands-on exercises that you can practice. We will go through basic use cases of Ansible followed by an introduction to Ansible Inventory, Playbooks, Modules, Variables, Conditionals, Loops and Roles. Each lecture is accompanied by a set of coding exercises giving the user a hands-on experience in developing Ansible Playbooks.'
    },
    { date: new Date(2019, 8, 9, 14, 30), duration: 60, location: 'Paris', author: 'Kong To',
      title: 'Workshop : Learn Java8',
      // tslint:disable-next-line:max-line-length
      content: 'Java 8 is the most awaited and is a major feature release of Java programming language. This is an introductory tutorial that explains the basic-to-advanced features of Java 8 and their usage in a simple and intuitive way. We will explore what Lambda expression, Method references, Default method, Stream API, Date Time and Optional.'
    }
];
