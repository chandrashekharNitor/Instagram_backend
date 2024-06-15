import { ConfigService } from "./config/config.service";
ConfigService.load();

console.log(ConfigService.get<number>("db_port"));
