
let ormconfig = {
  'type': 'mysql',
  'host': 'mysql.sktt.cba.pl',
  'port': 3306,
  'username': 'Iskra',
  'password': 'B6k960x4j4',
  'database': 'gregkikut',
  'entities': ['src/**/**.entity{.ts,.js}']
};

export default ormconfig;
