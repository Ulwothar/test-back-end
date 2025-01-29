import { describe } from 'node:test';
import { MembersService } from './members.service';

const memberService = new MembersService();
describe('Test the members service', () => {
  it('Should get first 20 members from the dataset', () => {
    const firstMembers = memberService.getAllMembers(0, 20);
    expect(firstMembers.length).toBe(20);
  });

  it('Should get maximum of 20 members, registered later than 2022-04-19 but not later than 2024-12-31', () => {
    const startDate = new Date('2022-04-19');
    const endDate = new Date('2024-12-31');
    const filteredMemebers = memberService.getMembersByDate(
      startDate,
      endDate,
      0,
      20,
    );
    expect(filteredMemebers.length).toBeLessThanOrEqual(20);
  });

  it('Should get 0 members, registered later than 2022-04-19 but not later than 2024-12-31', () => {
    const startDate = new Date('2022-04-19');
    const endDate = new Date('2024-12-31');
    const filteredMemebers = memberService.getMembersByDate(
      startDate,
      endDate,
      10,
      100,
    );
    expect(filteredMemebers.length).toBeLessThanOrEqual(20);
  });
});
