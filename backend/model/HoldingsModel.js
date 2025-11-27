import {model} from 'mongoose';

import HoldingSchema from '../schemas/HoldingSchema.js';

const Holding=model('Holding',HoldingSchema);

export default Holding;