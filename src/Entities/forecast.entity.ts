import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity'; // Import User entity

@Entity()
export class Forecast {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  temperature: number;

  @Column()
  humidity: number;

  @Column()
  windSpeed: number;

  @Column()
  solarRadiation: number;

  @Column()
  prediction: string; 

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.diagnoses, { onDelete: 'CASCADE' })
  user: User;
}
