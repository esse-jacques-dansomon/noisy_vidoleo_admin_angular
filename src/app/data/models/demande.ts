import {Status} from "../../core/enum/status";
import {OccasionType} from "./occasion-type";
import {Creator} from "./creator";
import {DemandeOption} from "./demande-option";
import {User} from "./user";

export interface Demande {
  id:               number;
  creator_id:       number;
  occasion_type_id: number;
  price:            number;
  code:             string;
  receiver:         string;
  message:          string;
  client_id:        number;
  client:           User;
  creator:          Creator;
  occasion_type:    OccasionType;
  options:          DemandeOption[];
  status:           Status;
  created_at:       Date;
  updated_at:       Date;

}
