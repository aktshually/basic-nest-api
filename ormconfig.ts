import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const config: TypeOrmModuleOptions = {
    type: "sqlite",
    database: "database.db",
    entities: ["dist/src/**/*.entity.js"],
    migrations: [
        "dist/src/db/migrations/*.js"
    ],
    cli: {
        migrationsDir: "src/db/migrations"
    }
}

export default config