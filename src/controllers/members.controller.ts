import { MembersService } from '../services/members.service';
import express from 'express';

const router = express.Router();
const membersService = new MembersService();

router.get('/', (req: any, res: any) => {
  const { page, perPage, fieldsIncluded } = req.query;
  console.log({ page, perPage, fieldsIncluded });
  try {
    const response = membersService.getAllMembers(
      page,
      perPage,
      fieldsIncluded,
    );
    return res.status(200).send(response);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: err });
  }
});

router.get('/byDate', (req: any, res: any) => {
  let { startDate, endDate, page, perPage } = req.query;
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  try {
    const response = membersService.getMembersByDate(
      startDate,
      endDate,
      page,
      perPage,
    );
    return res.status(200).send(response);
  } catch (err) {
    console.error('Error getting filtered members');
    return res.status(500).send({ error: err });
  }
});

export default router;

// export class MembersController {

//     router = express.Router();
//     constructor(private membersService: MembersService) {}

//     public getAllMembers(req: Request, res: Response) {
//         this.router.get()
//     }
// }
