import {Status} from "../../core/enum/status";
import {OccasionType} from "./occasion-type";
import {Creator} from "./creator";
import {DemandeOption} from "./demande-option";
import {User} from "./user";
import {CreatorOccasionType} from "./creator-occasion-type";

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
  occasion_type:    OccasionType;
  options:          DemandeOption[];
  status:           Status;
  created_at:       Date;
  updated_at:       Date;
  creatorOccasionType: CreatorOccasionType;


}
