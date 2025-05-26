import { EventDto } from "./event.dto";
import {PartialType} from '@nestjs/mapped-types';
export class updateEvent extends PartialType(EventDto){}