
export class DateHelper {
    static setHours(hours: number) {
        var datetime = new Date();
        datetime
        console.log('Before: ', datetime);
        datetime.setHours(datetime.getHours() + hours);
        console.log('After: ', datetime);

        return new Date(datetime).toLocaleString('en-US', { timeZone: 'Asia/Yerevan', dateStyle: 'medium', timeStyle: 'medium' });
    }
}