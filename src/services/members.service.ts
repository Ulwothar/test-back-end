import { member } from 'src/types/member.type';
import { exampleData } from '../exampleData';

export class MembersService {
  constructor() {}

  private membersData: member[] = exampleData;

  public getAllMembers(
    page?: number,
    perPage?: number,
    fieldsIncluded?: string[],
  ): member[] {
    page = page || 0;
    perPage = perPage || 20;

    const offset = Math.round(page * perPage);

    return this.membersData.slice(offset, offset + perPage);
  }

  public getMembersByDate(
    dateFrom: Date,
    dateTo: Date,
    page?: number,
    perPage?: number,
  ): member[] | any {
    page = page || 0;
    perPage = perPage || 20;

    const offset = Math.round(page * perPage);
    const lastMember = Math.round(offset + perPage);
    let counter = 0;
    const filteredMembers: member[] = [];
    for (let i = 0; i < this.membersData.length; i++) {
      const currentDate = new Date(
        this.membersData[i].registered.toString().split(' ')[0],
      );
      if (counter === 0) {
        console.log('Date too early: ', currentDate);
      }
      if (currentDate < dateFrom) {
        continue;
      }
      if (currentDate > dateTo) {
        continue;
      }
      if (counter < offset) {
        counter++;
        continue;
      }
      if (counter >= lastMember) {
        break;
      }
      filteredMembers.push(this.membersData[i]);
      counter++;
    }
    return filteredMembers;
  }
}
