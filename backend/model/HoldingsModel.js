import {model} from 'mongoose';

import HoldingSchema from '../schemas/holdingSchema.js';

const Holding=model('Holding',HoldingSchema);

export default Holding;