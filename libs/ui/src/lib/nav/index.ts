import { IconName } from "lucide-react/dynamic";

export interface NavItem {
  label: string;
  route: string;
  icon:IconName
}

export const navItems:NavItem[] = [{
  label:"Dashboard",
  route:"/dashboard",
  icon:"gauge"
},{
  label:"Classes",
  route:"/classes",
  icon:"users"
}]

