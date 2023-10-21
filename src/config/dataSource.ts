import { DataSource, DataSourceOptions } from 'typeorm';
import * as entities from '../entities/index';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const dataSourceOption: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'app',
  synchronize: true,
  entities: Object.values(entities),
  namingStrategy: new SnakeNamingStrategy(),
};

const dataSource = new DataSource(dataSourceOption);
export default dataSource;
