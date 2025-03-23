import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Forecast } from "./forecast.entity"; // Import Diagnosis entity

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Forecast, (forecast) => forecast.user)
    diagnoses: Forecast[];
}
