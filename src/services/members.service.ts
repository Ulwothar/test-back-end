import { member } from 'src/types/member.type';
import { exampleData } from '../exampleData';
import { customError } from 'src/types/error.type';

export class MembersService {
  constructor() {}

  private membersData: member[] = exampleData;

  public getAllMembers(page?: number, perPage?: number): member[] {
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
  ): member[] | customError[] {
    page = page || 0;
    perPage = perPage || 20;

    const offset = Math.round(page * perPage);
    const lastMember = Math.round(offset + perPage);
    let counter = 0;
    const filteredMembers: member[] = [];
    try {
      for (let i = 0; i < this.membersData.length; i++) {
        const currentDate = new Date(
          this.membersData[i].registered.toString().split(' ')[0],
        );
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
    } catch (err) {
      console.error('Error filtering data', err);
      return [{ error: err }];
    }
  }

  public getMembersBySport(
    sport: string,
    page: number,
    perPage: number,
  ): member[] | customError[] {
    page = page || 0;
    perPage = perPage || 20;

    const offset = Math.round(page * perPage);
    const lastMember = Math.round(offset + perPage);
    let counter = 0;
    const filteredMembers: member[] = [];
    sport = sport.toLowerCase();
    try {
      for (let i = 0; i < this.membersData.length; i++) {
        const currentSport = this.membersData[i].favoriteSport.toLowerCase();
        if (currentSport !== sport) {
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
    } catch (err) {
      console.error('Error filtering data', err);
      return [{ error: err }];
    }
  }
}
