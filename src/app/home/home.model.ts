export class Event {
    date: Date;
    duration: number;
    title = '';
    location = '';
    author = '';
}

export const UPCOMING_EVENTS: Array<Event> = [
    { date: new Date(2019, 8, 9, 14, 30), duration: 60, location: 'Paris', author: 'Kong To',
      title: 'Workshop : Angular from zero to production'},
    { date: new Date(2019, 8, 9, 14, 30), duration: 60, location: 'Paris', author: 'Kong To',
      title: 'Workshop : Begining with Ansible' },
    { date: new Date(2019, 8, 9, 14, 30), duration: 60, location: 'Paris', author: 'Kong To',
      title: 'Workshop : Learn Spring'}
];
